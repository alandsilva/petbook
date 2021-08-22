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
          <EditDetails credentials={{ bio, location, website }} />
          <a href='#' className={classes.edit}>
            <i class='fas fa-edit'></i>
          </a>
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
          <div className={classes.left}>
            <div className={classes.title}>About</div>
            <p className={classes.text}>{bio}</p>
          </div>

          <div className={classes.right}></div>
        </div>

        <div>
          <CalendarToday color='primary' />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
        {bio && (
          <div>
            <Info color='primary' /> <span>{bio}</span>
          </div>
        )}
        {location && (
          <div>
            <LocationOn color='primary' /> <span>{location}</span>
          </div>
        )}

        <Tooltip title='Logout' placement='top'>
          <IconButton onClick={handleLogout}>
            <KeyboardReturn color='primary' />
          </IconButton>
        </Tooltip>
        <EditDetails credentials={{ bio, location, website }} />
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
