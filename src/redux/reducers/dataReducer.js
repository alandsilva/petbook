import {
  SET_POSTS,
  SET_POST,
  CREATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  CREATE_COMMENT,
} from '../types';

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case LOADING_DATA:
      return { ...state, loading: true };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          (post) => post.postId !== action.payload.createdPost
        ),
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };

    default:
      return state;
  }
};

export default dataReducer;
