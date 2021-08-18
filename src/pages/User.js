import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../redux/actions/userActions';
import StaticProfile from '../components/profile/StaticProfile';
import Post from '../components/posts/Post';
import PostDetails from '../components/posts/PostDetails';

const User = () => {
  const handle = useParams().handle;
  const postId = useParams().postId;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.data.posts);

  useEffect(() => {
    dispatch(getUser(handle));
    if (postId) {
      postDetails = (
        <PostDetails post={posts.filter((post) => post.postId === postId)[0]} />
      );
    }
  }, [dispatch]);

  let recentPostsMarkup = !loading ? (
    posts.length > 0 ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <p>{'[No posts available]'}</p>
    )
  ) : (
    <p>Loading...</p>
  );

  let postDetails = postId ? (
    <PostDetails
      post={posts.filter((post) => post.postId === postId)[0]}
      open={true}
    />
  ) : null;

  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {recentPostsMarkup}
        {postDetails}
      </Grid>
      <Grid item sm={4} xs={12}>
        <StaticProfile loading={loading} user={user} />
      </Grid>
    </Grid>
  );
};

export default User;
