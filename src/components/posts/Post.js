import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import DeletePostButton from './DeletePostButton';
import PostDetails from './PostDetails';
import LikePostButton from './LikePostButton';
import Card from '../ui/Card';

import './Post.css';
import classes from './Post.module.css';

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
    // <Card className='card'>
    //   <CardMedia image={userImage} title='Profile Image' className='image' />
    //   <CardContent className='content'>
    //     <Typography
    //       variant='h5'
    //       component={Link}
    //       to={`/users/${userHandle}`}
    //       color='primary'
    //     >
    //       {userHandle}
    //     </Typography>
    //     <DeletePostButton postId={postId} userHandle={userHandle} />
    //     <Typography variant='body2' color='textSecondary'>
    //       {dayjs(createdAt).fromNow()}
    //     </Typography>
    //     <Typography variant='body1'>{body}</Typography>
    //     <LikePostButton postId={postId} />
    //     <span>{likeCount}</span>
    //     <CustomButton title='Comment' placement='top'>
    //       <ChatIcon color='primary' />
    //     </CustomButton>
    //     <span>{commentCount}</span>
    //     <PostDetails post={props.post} />
    //   </CardContent>
    // </Card>
    // <Card>
    //   <div className='post-card'>
    //     <div className='post-card-img'>
    //       <img src={userImage} alt='Profile Image' />
    //     </div>

    //     <div className='post-card-content'>
    //       <div>
    //         <Link className='post-card-handle' to={`/users/${userHandle}`}>
    //           @{userHandle}
    //         </Link>
    //         <p className='post-card-date'>{dayjs(createdAt).fromNow()}</p>
    //       </div>
    //       <p className='post-card-body'>{body}</p>
    //       <div className='post-card-buttons'>
    //         <div>
    //           <DeletePostButton postId={postId} userHandle={userHandle} />
    //         </div>
    //         <div className='post-card-actions'>
    //           <LikePostButton postId={postId} />
    //           <span>{likeCount}</span>
    //           <a href='#' className='sidebar-link'>
    //             <i class='fas fa-comments'></i>
    //           </a>
    //           <span>{commentCount}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Card>
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
            <p className={classes.handle}>@{userHandle}</p>
            <p className={classes.date}>{dayjs(createdAt).fromNow()}</p>
          </div>
          <DeletePostButton postId={postId} userHandle={userHandle} />
        </div>
        <p className={classes.body}>{body}</p>
        <div className={classes.actions}>
          <div>
            <a href='#' className='sidebar-link'>
              <i class='fas fa-comments'></i>
            </a>
            <span>{commentCount}</span>
          </div>
          <div>
            <LikePostButton postId={postId} />
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
