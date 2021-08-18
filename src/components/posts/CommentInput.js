import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: 'none',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const CommentInput = ({ comment, handleCreateComment }) => {
  const classes = useStyles();

  return (
    <div component='form' className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='Enter your comment'
        {...comment}
      />
      <IconButton
        className={classes.iconButton}
        aria-label='search'
        onClick={comment.clearValue}
      >
        <CloseIcon />
      </IconButton>
      <Divider className={classes.divider} orientation='vertical' />
      <IconButton
        color='primary'
        className={classes.iconButton}
        aria-label='directions'
        onClick={handleCreateComment}
      >
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default CommentInput;
