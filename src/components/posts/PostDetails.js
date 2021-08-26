import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import CommentList from './CommentList';
import LikePostButton from './LikePostButton';
import ActionButton from './ActionButton';
import useField from '../../hooks/useField';

import classes from './PostDetails.module.css';
import CommentInput from './CommentInput';
import { createComment } from '../../redux/actions/dataActions';

const PostDetails = (props) => {
  const history = useHistory();
  let comment = useField('text', 'Comment');
  let { postId } = useParams();
  let post = useSelector((state) =>
    state.data.posts.find((post) => post.postId === postId)
  );
  let authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  let [drop, setDrop] = useState(false);

  const toggleDrop = () => {
    if (!authenticated) {
      history.push('/login');
    } else {
      comment.clearValue();
      setDrop(!drop);
    }
  };

  const handleCreateComment = () => {
    console.log(comment.value);
    dispatch(createComment(postId, comment.value));
    comment.clearValue();
  };

  return (
    <div>
      <div className={classes.post}>
        <div className={classes.header}>
          <img src={post.userImage} alt='user image' />
          <p>@{post.userHandle}</p>
        </div>
        <div className={classes.body}>{post.body}</div>
        <div className={classes.date}>{` ${dayjs(post.createdAt).format(
          'h:mm A · DD MMM, YYYY'
        )}`}</div>
        <hr />
        <div className={classes.info}>
          <p>
            <span>{post.commentCount}</span> comments
          </p>
          <p>
            <span>{post.likeCount}</span> likes
          </p>
        </div>
        <hr />
        <div className={classes.buttons}>
          <ActionButton
            icon='fas fa-comments'
            color='blue'
            onClick={toggleDrop}
          />

          <LikePostButton postId={post.postId} />
        </div>
        <div className={drop ? classes.block : classes.none}>
          <CommentInput
            comment={comment}
            handleCreateComment={handleCreateComment}
          />
        </div>
      </div>
      <hr />
      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetails;
