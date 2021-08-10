import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

import Post from '../components/Post';
import Profile from '../components/Profile';

const Home = () => {
  let dispatch = useDispatch();
  let data = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  let recentPostsMarkup = !data.loading ? (
    data.posts.length > 0 ? (
      data.posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <p>{'[No posts available]'}</p>
    )
  ) : (
    <p>Loading</p>
  );

  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {recentPostsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
