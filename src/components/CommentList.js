import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';
import dayjs from 'dayjs';

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
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        console.log('Getting comment with id: ' + postId);
        let res = await axios.get('/posts/' + postId);
        console.log(res.data.postData.comments);
        setComments(res.data.postData.comments);
      } catch (err) {
        console.log(err);
      }
    };
    getComments();
  }, []);

  let itemListMarkup = comments.map((comment) => (
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
  ));

  return <List className={classes.root}>{itemListMarkup}</List>;
};

export default CommentList;
