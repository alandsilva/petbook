import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CustomButton from '../ui/CustomButton';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import PostPost from '../posts/PostPost';

const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);

  const navbarButtons = authenticated ? (
    <>
      <CustomButton
        title='Home'
        placement='bottom'
        onClick={console.log('Home!')}
      >
        <HomeIcon color='accent' />
      </CustomButton>

      <PostPost />

      <CustomButton
        title='Notifications'
        placement='bottom'
        onClick={console.log('Home!')}
      >
        <NotificationsIcon color='accent' />
      </CustomButton>
    </>
  ) : (
    <>
      <Button color='inherit' component={Link} to='/login'>
        Login
      </Button>
      <Button color='inherit' component={Link} to='/'>
        Home
      </Button>
      <Button color='inherit' component={Link} to='/signup'>
        Signup
      </Button>
    </>
  );

  return (
    <AppBar>
      <Toolbar>{navbarButtons}</Toolbar>
    </AppBar>
  );
};

export default Navbar;
