import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import DeletePostButton from './DeletePostButton';
import LikePostButton from './LikePostButton';

import './Post.css';
import classes from './Post.module.css';
import ActionButton from './ActionButton';

const Post = (props) => {
  const {
    post: {
      body,
      createdAt,
      userImage,
      userHandle,
      postId,
      likeCount,
      commentCount,
    },
  } = props;

  const post = props.post;

  dayjs.extend(relativeTime);

  return (
    <Link
      className={classes.container}
      postProps={post}
      to={`/posts/${postId}`}
    >
      <div className={classes.image}>
        <img src={userImage} alt='user image' />
      </div>
      <div className={classes.content}>
        <div className={classes.header}>
          <div>
            <Link to={`/users/${userHandle}`}>
              <p className={classes.handle}>@{userHandle}</p>
            </Link>

            <p className={classes.date}>{dayjs(createdAt).fromNow()}</p>
          </div>
          <DeletePostButton postId={postId} userHandle={userHandle} />
        </div>
        <p className={classes.body}>{body}</p>
        <div className={classes.actions}>
          <div>
            <ActionButton
              href='/'
              icon='fas fa-comments'
              span={commentCount}
              color='blue'
            />
          </div>
          <div>
            <LikePostButton postId={postId} span={likeCount} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
