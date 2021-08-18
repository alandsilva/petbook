import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Paper, Link as MuiLink } from '@material-ui/core';
import { CalendarToday, Info, LocationOn } from '@material-ui/icons';

const StaticProfile = (props) => {
  const {
    loading,
    user: { imageUrl, createdAt, location, bio, handle },
  } = props;

  let profileMarkup = !loading ? (
    <Paper className='profile'>
      <div className='image-wrapper'>
        <img src={imageUrl} alt='profile' className='profile-image' />
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
    </Paper>
  ) : (
    <div>Loading</div>
  );
  return profileMarkup;
};

export default StaticProfile;
