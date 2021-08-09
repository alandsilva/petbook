import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from '@material-ui/core';
import { editUserDetails } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import useField from '../hooks/useField';

const EditDetails = ({ credentials }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const bio = useField('text', 'Bio', credentials.bio);
  const location = useField('text', 'Location', credentials.location);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: bio.value,
      location: location.value,
    };
    dispatch(editUserDetails(userDetails));
  };

  return (
    <div>
      <Tooltip title='Edit account details' placement='top'>
        <Button variant='outlined' color='primary' onClick={handleClickOpen}>
          Edit
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Account Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            {...bio}
            multiline
            rows='3'
            fullWidth
          />
          <TextField margin='dense' {...location} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditDetails;
