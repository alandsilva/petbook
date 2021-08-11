import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import dayjs from 'dayjs';

import LikePostButton from './LikePostButton';
import DeletePostButton from './DeletePostButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    maxWidth: '100%',
    borderRadius: '50%',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const PostDetailsCard = ({ post }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <img className={classes.image} alt='userImage' src={post.userImage} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant='h6'>@new</Typography>
          <Typography variant='body2' color='textSecondary'>
            {dayjs(post.createdAt).format('h:mm a, DD MMMM YYYY')}
          </Typography>
          <Typography>{post.body}</Typography>
          <div className={classes.buttons}>
            <LikePostButton postId={post.postId} />
            <Typography variant='body2' color='textSecondary'>
              {post.likeCount} likes
            </Typography>
            <DeletePostButton
              postId={post.postId}
              userHandle={post.userHandle}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostDetailsCard;
