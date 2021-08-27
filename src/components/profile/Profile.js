import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import EditDetails from './EditDetails';

import classes from './Profile.module.css';
import ActionButton from '../posts/ActionButton';

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
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.image}>
            <img src={imageUrl} alt='profileImage' />
            <input
              hidden
              type='file'
              id='imageInput'
              onChange={handleImageChange}
            />
            <div className={classes.input} onClick={handleEditPicture}>
              <i class='fas fa-camera'></i>
            </div>
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
          <hr />
          <div className={classes.buttons}>
            <div className={classes.logout}>
              <ActionButton
                onClick={handleLogout}
                icon='fas fa-sign-out-alt'
                color='red'
                span='Logout'
              />
            </div>
            <div className={classes.edit}>
              <EditDetails credentials={{ bio, location, website }} />
            </div>
          </div>
          <hr />
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
