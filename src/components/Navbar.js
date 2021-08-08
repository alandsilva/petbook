import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Button color='inherit' component={Link} to='/login'>
          Login
        </Button>
        <Button color='inherit' component={Link} to='/'>
          Home
        </Button>
        <Button color='inherit' component={Link} to='/signup'>
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
