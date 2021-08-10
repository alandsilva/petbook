import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

import CustomButton from './CustomButton';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import DeletePost from './DeletePost';

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
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  const likedPost = () => {
    if (user.likes && user.likes.find((like) => like.postId === postId)) {
      return true;
    } else {
      return false;
    }
  };

  const handleLike = () => {
    dispatch(likePost(postId));
  };

  const handleUnlike = () => {
    dispatch(unlikePost(postId));
  };
  dayjs.extend(relativeTime);

  const likeButton = !user.authenticated ? (
    <CustomButton title='Like' placement='top'>
      <Link to='/login'>
        <FavoriteBorder color='primary' />
      </Link>
    </CustomButton>
  ) : likedPost() ? (
    <CustomButton title='Remove Like' placement='top' onClick={handleUnlike}>
      <FavoriteIcon color='primary' />
    </CustomButton>
  ) : (
    <CustomButton title='Like' placement='top' onClick={handleLike}>
      <FavoriteBorder color='primary' />
    </CustomButton>
  );

  const deleteButton =
    user.authenticated && user.credentials.handle === userHandle ? (
      <DeletePost postId={postId} />
    ) : null;

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
        {deleteButton}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
        {likeButton}
        <span>{likeCount}</span>
        <CustomButton title='Comment' placement='top'>
          <ChatIcon color='primary' />
        </CustomButton>
        <span>{commentCount}</span>
      </CardContent>
    </Card>
  );
};

export default Post;
