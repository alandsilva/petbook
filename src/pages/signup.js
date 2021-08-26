import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useField from '../hooks/useField';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import Card from '../components/ui/Card';

import classes from './Login.module.css';
import Button from '../components/ui/Button';

const Signup = () => {
  const email = useField('email', 'Email');
  const handle = useField('text', 'Handle');
  const password = useField('password', 'Password');
  const confirmPassword = useField('password', 'Confirm Password');
  const dispatch = useDispatch();
  const history = useHistory();
  const ui = useSelector((state) => state.ui);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: email.value,
      handle: handle.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    dispatch(signupUser(userData, history));
  };
  return (
    <div className={classes.container}>
      <Card>
        <h1 className={classes.title}>Signup</h1>
        <form noValidate onSubmit={handleSubmit}>
          <Input {...email} error={ui.errors.email} />
          <Input {...handle} error={ui.errors.hande} />
          <Input {...password} error={ui.errors.password} />
          <Input {...confirmPassword} error={ui.errors.confirmPassword} />
          {ui.errors.general && (
            <Typography variant='body2' className='customError'>
              {ui.errors.general}
            </Typography>
          )}

          <div className={classes.action}>
            <Button disabled={ui.loading}>
              Submit
              {ui.loading && <Loader />}
            </Button>
          </div>
          <br />
          <small>
            already have an account? log in <Link to='/login'>here</Link>
          </small>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
