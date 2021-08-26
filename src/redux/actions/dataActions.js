import {
  SET_POSTS,
  SET_POST,
  CREATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  CREATE_COMMENT,
} from '../types';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });

  try {
    let res = await axios.get('/posts');
    dispatch({ type: SET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: SET_POSTS, payload: [] });
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    let res = await axios.get(`/posts/${postId}/like`);
    console.log(res.data);
    dispatch({ type: LIKE_POST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  try {
    let res = await axios.get(`/posts/${postId}/unlike`);
    console.log(res.data);
    dispatch({ type: UNLIKE_POST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await axios.post('/posts', newPost);
    console.log(res.data);
    dispatch({ type: CREATE_POST, payload: res.data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    let res = await axios.get(`/posts/${postId}`);
    dispatch({ type: SET_POST, payload: res.data });
  } catch (err) {
    dispatch({ type: SET_POST, payload: {} });
  }
};

export const createComment = (postId, newComment) => async (dispatch) => {
  console.log(`Will post to ${postId} with comment ${newComment}`);
  try {
    let res = await axios.post(`/posts/${postId}/comment`, {
      body: newComment,
    });
    dispatch({ type: CREATE_COMMENT, payload: res.data });
    dispatch({ type: CLEAR_ERRORS });
    console.log('Comment succesfully added');
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
    console.log('Error adding comment: ' + err.response.data);
  }
};
