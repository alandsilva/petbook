import {
  SET_CREDENTIALS,
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
  MARK_NOTIFICATIONS_READ,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_CREDENTIALS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return { ...state, loading: true };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId,
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        ),
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notification) => (notification.read = true));
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
