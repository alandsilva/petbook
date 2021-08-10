import {
  SET_POSTS,
  SET_POST,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
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
    default:
      return state;
  }
};

export default dataReducer;
