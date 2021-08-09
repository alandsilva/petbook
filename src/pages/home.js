import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';

import Post from '../components/Post';
import Profile from '../components/Profile';

const Home = () => {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  let recentPostsMarkup =
    posts.length > 0 ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <p>Loading...</p>
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
