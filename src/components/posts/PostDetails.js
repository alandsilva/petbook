import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';

import CustomButton from '../ui/CustomButton';
import PostDetailsCard from './PostDetailsCard';
import CommentList from './CommentList';
import NewComment from './NewComment';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, post } = props;
  return (
    <MuiDialogTitle>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const PostDetails = (props) => {
  const [open, setOpen] = React.useState(props.open ? true : false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomButton
        title='Open Post'
        post={props.post}
        placement='top'
        onClick={handleClickOpen}
      >
        <CodeIcon color='primary' />
      </CustomButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          <PostDetailsCard post={props.post} />
        </DialogTitle>
        <DialogContent dividers>
          <NewComment />
          <CommentList postId={props.post.postId} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDetails;
