import React from 'react';
import { useLocation } from 'react-router-dom';

import classes from './Header.module.css';

const Header = () => {
  const location = useLocation();
  let pathname;

  if (location.pathname === '/') {
    pathname = 'home';
  } else if (location.pathname.includes('posts')) {
    pathname = 'thread';
  } else if (location.pathname.includes('users')) {
    pathname = '@ ' + location.pathname.split('/')[2];
  } else {
    pathname = location.pathname.substring(1);
  }
  return <div className={classes.container}>{pathname.toUpperCase()}</div>;
};

export default Header;
