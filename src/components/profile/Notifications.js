import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import dayjs from 'dayjs';

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = useSelector((state) =>
    state.user.notifications.filter(
      (notification) => notification.read === false
    )
  );

  let notificationsMarkup =
    notifications.length > 0 ? (
      notifications.map((notification) => {
        const word = notification.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? 'primary' : 'secondary';
        const icon =
          notification.type === 'like' ? (
            <FavoriteIcon color={iconColor} />
          ) : (
            <ChatIcon color={iconColor} />
          );
        return (
          <MenuItem
            key={notification.createdAt}
            onClick={() => {
              handleClose();
              history.push(
                `/users/${notification.receiver}/posts/${notification.postId}`
              );
            }}
          >
            {icon}
            <Typography color='primary' variant='body1'>
              @{notification.sender} {word} your post {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <p>No Notifications</p>
    );

  return (
    <>
      <Badge badgeContent={notifications.length} color='secondary'>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <NotificationsIcon />
        </IconButton>
      </Badge>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notificationsMarkup}
      </Menu>
    </>
  );
};

export default Notification;
