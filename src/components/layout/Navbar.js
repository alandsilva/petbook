import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CustomButton from '../ui/CustomButton';

import HomeIcon from '@material-ui/icons/Home';
import MuiLink from '@material-ui/core/Link';

import PostPost from '../posts/PostPost';
import Notifications from '../profile/Notifications';

import './Navbar.css';

const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const imageUrl = useSelector((state) => state.user.credentials.imageUrl);

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

  const navigationButtons = authenticated ? (
    <>
      <li className='navigation-item'>
        <a href='/' className='navigation-link'>
          home
        </a>
      </li>
      <li className='navigation-item'>
        <a href='/login' className='navigation-link'>
          logout
        </a>
      </li>
    </>
  ) : (
    <>
      <li className='navigation-item'>
        <a href='/' className='navigation-link'>
          home
        </a>
      </li>
      <li className='navigation-item'>
        <a href='/login' className='navigation-link'>
          login
        </a>
      </li>
      <li className='navigation-item'>
        <a href='/signup' className='navigation-link'>
          signup
        </a>
      </li>
    </>
  );

  return (
    // <AppBar>
    //   <Toolbar>{navbarButtons}</Toolbar>
    // </AppBar>
    <div className='navbar'>
      <input type='checkbox' className='checkbox' id='click' />

      <div className='sidebar'>
        <label for='click'>
          <div className='menu-icon'>
            <div className='line line-1'></div>
            <div className='line line-2'></div>
            <div className='line line-3'></div>
          </div>
        </label>

        {authenticated && (
          <ul className='sidebar-icons-list'>
            <li>
              <a href='/account' className='sidebar-link'>
                <img src={imageUrl} alt='profile-image' />
              </a>
            </li>
            <li>
              <a href='/' className='sidebar-link'>
                <i class='fas fa-home'></i>
              </a>
            </li>
            <li>
              <a href='#' className='sidebar-link'>
                <i className='fas fa-plus-circle'></i>
              </a>
            </li>
            <li>
              <a href='#' className='sidebar-link'>
                <i class='fas fa-bell'></i>
              </a>
            </li>
          </ul>
        )}

        <div className='year'>
          <p>2021</p>
        </div>
      </div>

      <nav class='navigation'>
        <div className='navigation-header'>
          <h1 className='navigation-heading'>Petbook</h1>

          <form className='navigation-search'>
            <input
              type='text'
              className='navigation-search-input'
              placeholder='Search...'
            />
            <button className='navigation-search-btn'>
              <i className='fas fa-search'></i>
            </button>
          </form>
        </div>

        <ul className='navigation-list'>{navigationButtons}</ul>

        <p className='copyright'>&copy;2021 PetBook. All Rights Reserved.</p>
      </nav>
    </div>
  );
};

export default Navbar;
