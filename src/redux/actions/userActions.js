import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED,
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/login', userData);
    console.log(res.data);
    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/signup', newUserData);
    console.log(res.data);
    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const res = await axios.get('/user');
    console.log(res.data);
    dispatch({ type: SET_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const uploadImage = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_USER });

  try {
    await axios.post('/user/image', formData);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

export const editUserDetails = (userDetails) => async (dispatch) => {
  dispatch({ type: LOADING_USER });

  try {
    await axios.post('/user', userDetails);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

const setAuthorizationHeader = (token) => {
  const FBToken = `Bearer ${token}`;
  localStorage.setItem('FBToken', FBToken);
  axios.defaults.headers.common['Authorization'] = FBToken;
};
