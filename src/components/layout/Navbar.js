import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../ui/Modal';
import NewPost from '../posts/NewPost';
import classes from './Navbar.module.css';
const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const notifications = useSelector((state) => state.user.notifications);

  const [modal, setModal] = useState(false);
  const onOpen = () => {
    setModal(true);
  };
  const onClose = () => {
    setModal(false);
  };

  let linksMarkup = authenticated ? (
    <>
      <li className={classes.item}>
        <Link to='/' className={classes.link}>
          <i className='fas fa-paw'></i>{' '}
          <span className={classes.disappears}>Petbook</span>
        </Link>
      </li>
      <li className={classes['item-mobile']}>
        <p onClick={onOpen} className={classes.link}>
          <i className='fas fa-plus-square'></i>
        </p>
      </li>
      <li className={classes.item}>
        <Link to='/account' className={classes.link}>
          <i className='fas fa-user'></i>{' '}
          <span className={classes.disappears}>account</span>
        </Link>
      </li>
      <li className={classes['item-mobile']}>
        <Link to='/notifications' className={classes.link}>
          <i className='fas fa-bell'></i>
          <span className={classes.badge}>{notifications.length}</span>
        </Link>
      </li>

      {modal && (
        <Modal header='New Post' footer='Footer' onClose={onClose}>
          <div className={classes.modal}>
            <NewPost onClick={onClose} />
          </div>
        </Modal>
      )}
    </>
  ) : (
    <>
      <li className={classes.item}>
        <Link to='/' className={classes.link}>
          <i className='fas fa-paw'></i>{' '}
          <span className={classes.disappears}>Petbook</span>
        </Link>
      </li>
      <li className={classes.item}>
        <Link to='/login' className={classes.link}>
          <i className='fas fa-sign-in-alt'></i>{' '}
          <span className={classes.disappears}>login</span>
        </Link>
      </li>
      <li className={classes.item}>
        <Link to='/signup' className={classes.link}>
          <i className='fas fa-user-plus'></i>{' '}
          <span className={classes.disappears}>signup</span>
        </Link>
      </li>
    </>
  );

  return (
    <nav className={classes.container}>
      <ul className={classes.list}>{linksMarkup}</ul>

      <p className={classes.copyright}>
        &copy;2021 PetBook. All Rights Reserved.
      </p>
    </nav>
  );
};

export default Navbar;
