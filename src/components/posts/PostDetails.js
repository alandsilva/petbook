import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import CommentList from './CommentList';

import classes from './PostDetails.module.css';

const PostDetails = (props) => {
  let { postId } = useParams();
  let post = useSelector((state) =>
    state.data.posts.find((post) => post.postId === postId)
  );

  return (
    <div>
      <div>
        <i className='fas fa-long-arrow-alt-left'></i>
      </div>
      <hr />
      <div>
        <div className={classes.header}>
          <img src={post.userImage} alt='user image' />
          <h3>@{post.userHandle}</h3>
        </div>
        <div>{post.body}</div>
        <div>{post.createdAt}</div>
        <hr />
        <div>Buttons</div>
        <hr />
      </div>

      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetails;
