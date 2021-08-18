import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomButton from '../ui/CustomButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions';

const DeletePost = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteScream = () => {
    dispatch(deletePost(props.postId));
    handleClose();
  };

  return (
    <>
      <CustomButton
        title='Delete Post'
        placement='right'
        onClick={handleClickOpen}
      >
        <DeleteOutlineIcon color='secondary' />
      </CustomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete post?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You are about to delete this post. Confirm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={deleteScream} color='secondary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePost;
