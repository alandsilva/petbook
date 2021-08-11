import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

import CustomButton from './CustomButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const LikePostButton = ({ postId }) => {
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

  return likeButton;
};

export default LikePostButton;
