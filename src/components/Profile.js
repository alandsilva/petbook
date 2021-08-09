import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Paper,
  Button,
  Typography,
  Link as MuiLink,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { LocationOn, LinkIcon, CalendarToday, Edit } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

const Profile = () => {
  const dispatch = useDispatch();
  const {
    authenticated,
    loading,
    credentials: { imageUrl, createdAt, userId, email, handle },
  } = useSelector((state) => state.user);

  console.log(authenticated);
  console.log(handle);
  console.log(imageUrl);

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
