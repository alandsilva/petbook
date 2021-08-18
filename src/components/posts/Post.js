import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import CustomButton from '../ui/CustomButton';
import ChatIcon from '@material-ui/icons/Chat';

import DeletePostButton from './DeletePostButton';
import PostDetails from './PostDetails';
import LikePostButton from './LikePostButton';

const Post = (props) => {
  const {
    post: {
      body,
      createdAt,
      userImage,
      userHandle,
      postId,
      likeCount,
      commentCount,
    },
  } = props;

  dayjs.extend(relativeTime);

  return (
    <Card className='card'>
      <CardMedia image={userImage} title='Profile Image' className='image' />
      <CardContent className='content'>
        <Typography
          variant='h5'
          component={Link}
          to={`/users/${userHandle}`}
          color='primary'
        >
          {userHandle}
        </Typography>
        <DeletePostButton postId={postId} userHandle={userHandle} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
        <LikePostButton postId={postId} />
        <span>{likeCount}</span>
        <CustomButton title='Comment' placement='top'>
          <ChatIcon color='primary' />
        </CustomButton>
        <span>{commentCount}</span>
        <PostDetails post={props.post} />
      </CardContent>
    </Card>
  );
};

export default Post;
