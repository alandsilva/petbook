import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Link as MuiLink, IconButton, Tooltip } from '@material-ui/core';
import {
  CalendarToday,
  Edit,
  KeyboardReturn,
  Info,
  LocationOn,
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import EditDetails from './EditDetails';
import Card from '../ui/Card';

import classes from './Profile.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  const {
    authenticated,
    loading,
    credentials: { imageUrl, createdAt, location, website, bio, handle },
  } = useSelector((state) => state.user);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    dispatch(uploadImage(formData));
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  let profileMarkup = !loading ? (
    authenticated ? (
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.edit}>
            <EditDetails credentials={{ bio, location, website }} />
          </div>
          <div className={classes.main}>
            <div className={classes.image}>
              <img src={imageUrl} alt='profileImage' />
              <input
                hidden
                type='file'
                id='imageInput'
                onChange={handleImageChange}
              />
              <div className={classes.hover} onClick={handleEditPicture}>
                <i class='fas fa-camera'></i>
              </div>
            </div>
            <h3 className={classes.handle}>@{handle}</h3>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.title}>About</div>
          {bio && <p className={classes.text}>{bio}</p>}

          <div>
            <i class='far fa-calendar-alt'></i>
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>

          {location && (
            <div>
              <i class='fas fa-map-pin'></i> <span>{location}</span>
            </div>
          )}

          <div className={classes.logout}>
            <a href='#' className='sidebar-link' onClick={handleLogout}>
              <i class='fas fa-sign-out-alt'></i>
            </a>
          </div>
        </div>
      </div>
    ) : (
      <div>Profile goes here...</div>
    )
  ) : (
    <div>Loading</div>
  );
  return profileMarkup;
};

export default Profile;
