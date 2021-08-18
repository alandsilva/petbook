import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import dayjs from 'dayjs';

import { getPost } from '../../redux/actions/dataActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const CommentList = ({ postId }) => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch]);

  let itemListMarkup = data.post.comments ? (
    data.post.comments.map((comment) => (
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src={comment.userImage} />
        </ListItemAvatar>
        <ListItemText
          primary={`@${comment.userHandle}`}
          secondary={
            <React.Fragment>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textPrimary'
              >
                {comment.body} -
              </Typography>
              {` ${dayjs(comment.createdAt).format('h:mm a, DD MMM YYYY')}`}
            </React.Fragment>
          }
        />
      </ListItem>
    ))
  ) : (
    <p>No comments</p>
  );

  return <List className={classes.root}>{itemListMarkup}</List>;
};

export default CommentList;
