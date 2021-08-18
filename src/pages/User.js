import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../redux/actions/userActions';
import StaticProfile from '../components/profile/StaticProfile';
import Post from '../components/posts/Post';

const User = () => {
  const handle = useParams().handle;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.data.posts);

  useEffect(
    (props) => {
      dispatch(getUser(handle));
    },
    [dispatch]
  );

  let recentPostsMarkup = !loading ? (
    posts.length > 0 ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <p>{'[No posts available]'}</p>
    )
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {recentPostsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <StaticProfile loading={loading} user={user} />
      </Grid>
    </Grid>
  );
};

export default User;
