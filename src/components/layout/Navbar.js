import React from 'react';
import { useSelector } from 'react-redux';

import classes from './Navbar.module.css';
const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const imageUrl = useSelector((state) => state.user.credentials.imageUrl);

  return (
    <nav className={classes.container}>
      <ul className={classes.list}>
        <li className={classes.item}>
          <a href='/' className={classes.link}>
            <i class='fas fa-paw'></i> <span>Petbook</span>
          </a>
        </li>
        <li className={classes.item}>
          <a href='/login' className={classes.link}>
            <i class='fas fa-sign-in-alt'></i> <span>login</span>
          </a>
        </li>
        <li className={classes.item}>
          <a href='/signup' className={classes.link}>
            <i class='fas fa-user-plus'></i> <span>signup</span>
          </a>
        </li>
      </ul>

      <p className={classes.copyright}>
        &copy;2021 PetBook. All Rights Reserved.
      </p>
    </nav>
  );
};

export default Navbar;
