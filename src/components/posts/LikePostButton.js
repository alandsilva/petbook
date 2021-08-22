import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

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
    <a href='/login' className='sidebar-link'>
      <i class='far fa-heart'></i>
    </a>
  ) : likedPost() ? (
    <a href='#' className='sidebar-link' onClick={handleUnlike}>
      <i class='fas fa-heart'></i>
    </a>
  ) : (
    <a href='#' className='sidebar-link' onClick={handleLike}>
      <i class='far fa-heart'></i>
    </a>
  );

  return likeButton;
};

export default LikePostButton;
