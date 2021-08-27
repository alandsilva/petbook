import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/actions/dataActions';

import useField from '../../hooks/useField';

import classes from './NewPost.module.css';
import Loader from '../ui/Loader';

const PostPost = ({ onClick }) => {
  let post = useField('text', 'Post');
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handlePost = () => {
    dispatch(createPost({ body: post.value }));
    post.clearValue();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={classes.container}>
      <p>What's on your mind?</p>
      <div className={classes.input}>
        <textarea {...post} rows='4' placeholder='Enter new post' />
        <button className={classes.button} onClick={handlePost}>
          POST
          {ui.loading && <Loader />}
        </button>
      </div>
    </div>
  );
};

export default PostPost;
