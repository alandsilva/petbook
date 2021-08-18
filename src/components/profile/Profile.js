import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Paper, Link as MuiLink, IconButton, Tooltip } from '@material-ui/core';
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
      <Paper className='profile'>
        <div className='image-wrapper'>
          <img src={imageUrl} alt='profile' className='profile-image' />
          <input
            hidden
            type='file'
            id='imageInput'
            onChange={handleImageChange}
          />
          <Tooltip title='Edit profile picture' placement='top'>
            <IconButton onClick={handleEditPicture} className='button'>
              <Edit color='primary' />
            </IconButton>
          </Tooltip>
        </div>
        <MuiLink component={Link} to={`/user/${handle}`}>
          @{handle}
        </MuiLink>
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
      </Paper>
    ) : (
      <div>Profile goes here...</div>
    )
  ) : (
    <div>Loading</div>
  );
  return profileMarkup;
};

export default Profile;
