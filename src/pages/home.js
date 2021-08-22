import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

import Post from '../components/posts/Post';

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

  return <div>{recentPostsMarkup}</div>;
};

export default Home;
