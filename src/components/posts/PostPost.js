import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import CustomButton from '../ui/CustomButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions/dataActions';

import useField from '../../hooks/useField';

const PostPost = () => {
  const [open, setOpen] = useState(false);
  let post = useField('text', 'Post');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = () => {
    dispatch(createPost({ body: post.value }));
    handleClose();
  };

  return (
    // <>
    //   <CustomButton
    //     title='Add Post'
    //     placement='bottom'
    //     onClick={handleClickOpen}
    //   >
    //     <AddBoxIcon color='accent' />
    //   </CustomButton>
    //   <Dialog
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby='form-dialog-title'
    //     fullWidth
    //   >
    //     <DialogTitle onClose={handleClose} id='form-dialog-title'>
    //       Add Post
    //     </DialogTitle>
    //     <DialogContent dividers>
    //       <DialogContentText>What is on your mind?</DialogContentText>
    //       <TextField autoFocus margin='dense' {...post} fullWidth />
    //     </DialogContent>
    //     <DialogActions>
    //       <Button className='button' onClick={handlePost} color='primary'>
    //         Post
    //       </Button>
    //       {/* {ui.loading && <CircularProgress className='progress' size={30} />} */}
    //     </DialogActions>
    //   </Dialog>
    // </>
    <>
      <li>
        <a href='#' className='sidebar-link'>
          <i className='fas fa-plus-circle'></i>
        </a>
      </li>
    </>
  );
};

const DialogTitle = (props) => {
  const { onClose, children } = props;
  return (
    <MuiDialogTitle disableTypography class='dialog-title'>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <CustomButton title='close' onClick={onClose}>
          <CloseIcon />
        </CustomButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default PostPost;
