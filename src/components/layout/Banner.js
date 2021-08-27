import React from 'react';
import { useSelector } from 'react-redux';
import NewPost from '../posts/NewPost';
import Notifications from '../profile/Notifications';

import classes from './Banner.module.css';

const Banner = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const credentials = useSelector((state) => state.user.credentials);

  return authenticated ? (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={credentials.imageUrl} alt='Profile' />
        Welcome back <strong>@{credentials.handle}</strong>
      </div>
      <NewPost />
      <Notifications />
    </div>
  ) : (
    <div className={classes.container}>
      <div className={classes.invitation}>
        <h3 className={classes.title}>New to Petbook?</h3>
        <p className={classes.caption}>Sign up to get started</p>
        <div className={classes.buttons}>
          <button className={classes.button}>sign up with email</button>
        </div>
      </div>

      <div className={classes.invitation}>
        <h3 className={classes.title}>Returning user?</h3>
        <p className={classes.caption}>Log in to catch up</p>
        <div className={classes.buttons}>
          <button className={classes.button}>log in</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
