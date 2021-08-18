import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CustomButton from '../ui/CustomButton';

import HomeIcon from '@material-ui/icons/Home';
import MuiLink from '@material-ui/core/Link';

import PostPost from '../posts/PostPost';
import Notifications from '../profile/Notifications';

const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);

  const navbarButtons = authenticated ? (
    <>
      <CustomButton title='Home' placement='bottom'>
        <MuiLink href='/' color='inherit'>
          <HomeIcon />
        </MuiLink>
      </CustomButton>

      <PostPost />

      <Notifications />
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
