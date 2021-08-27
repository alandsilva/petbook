import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { markNotificationsRead } from '../../redux/actions/userActions';

import dayjs from 'dayjs';

import classes from './Notifications.module.css';

const Notifications = () => {
  const notifications = useSelector((state) =>
    state.user.notifications.filter(
      (notification) => notification.read === false
    )
  );
  const dispatch = useDispatch();

  const handleClose = (params) => {
    dispatch(markNotificationsRead(params));
  };

  const handleClearAll = () => {
    const ids = notifications.map(
      (notification) => notification.notificationId
    );
    dispatch(markNotificationsRead(ids));
  };

  let notificationsMarkup =
    notifications.length > 0 ? (
      notifications.map((notification) => {
        const word = notification.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(notification.createdAt).fromNow();
        const icon =
          notification.type === 'like' ? (
            <i
              className={classes.heart + ' ' + 'fas fa-heart'}
              class='fas fa-heart'
            ></i>
          ) : (
            <i
              className={classes.comment + ' ' + 'fas fa-comments'}
              class='fas fa-comments'
            ></i>
          );
        return (
          <Link
            className={classes.link}
            to={`/posts/${notification.postId}`}
            key={notification.createdAt}
            onClick={() => {
              handleClose([notification.notificationId]);
            }}
          >
            <div className={classes.notification}>
              {icon}
              <span color='primary' variant='body1'>
                @{notification.sender} {word} your post {time}
              </span>
            </div>
          </Link>
        );
      })
    ) : (
      <p>No Notifications</p>
    );

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.bell}>
          <i className='fas fa-bell'></i>
          <span className={classes.badge}>{notifications.length}</span>
        </div>
        <p onClick={handleClearAll} className={classes.clear}>
          Clear All
        </p>
      </div>

      <div className={classes.content}>{notificationsMarkup}</div>
    </div>
  );
};

export default Notifications;
