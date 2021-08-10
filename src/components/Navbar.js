import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CustomButton from './CustomButton';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const history = useHistory();

  const navbarButtons = authenticated ? (
    <>
      <CustomButton
        title='Home'
        placement='bottom'
        onClick={console.log('Home!')}
      >
        <HomeIcon color='accent' />
      </CustomButton>
      <CustomButton
        title='Add Post'
        placement='bottom'
        onClick={console.log('Home!')}
      >
        <AddBoxIcon color='accent' />
      </CustomButton>
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
