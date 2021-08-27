import React from 'react';
import classes from './Profile.module.css';
import dayjs from 'dayjs';

const StaticProfile = (props) => {
  const {
    loading,
    user: { imageUrl, createdAt, location, bio, handle },
  } = props;

  let profileMarkup = !loading ? (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.image}>
          <img src={imageUrl} alt='profileImage' />
        </div>
        <p className={classes.handle}>@{handle}</p>
      </div>

      <div className={classes.content}>
        {bio && <p className={classes.bio}>{bio}</p>}
        <div className={classes.info}>
          <i class='far fa-calendar-alt'></i>
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>

        {location && (
          <div className={classes.info}>
            <i class='fas fa-map-pin'></i> <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
  return profileMarkup;
};

export default StaticProfile;
