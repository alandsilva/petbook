import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likePost, unlikePost } from '../../redux/actions/dataActions';
import ActionButton from './ActionButton';

const LikePostButton = ({ postId, span }) => {
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
    <Link
      to='/login'
      className='sidebar-link'
      onClick={() => console.log('Going to login')}
    >
      <ActionButton href={true} icon='far fa-heart' color='pink' span={span} />
    </Link>
  ) : likedPost() ? (
    // <a href='#' className='sidebar-link' onClick={handleUnlike}>
    //   <i class='fas fa-heart'></i>
    // </a>
    <ActionButton
      icon='fas fa-heart'
      color='pink'
      span={span}
      onClick={() => handleUnlike()}
    />
  ) : (
    // <a href='#' className='sidebar-link' onClick={handleLike}>
    //   <i class='far fa-heart'></i>
    // </a>
    <ActionButton
      icon='far fa-heart'
      color='pink'
      span={span}
      onClick={() => handleLike()}
    />
  );

  return likeButton;
};

export default LikePostButton;
