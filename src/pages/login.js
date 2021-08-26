import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useField from '../hooks/useField';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import Card from '../components/ui/Card';

import classes from './Login.module.css';
import Button from '../components/ui/Button';

const Login = () => {
  const email = useField('email', 'Email');
  const password = useField('password', 'Password');
  const dispatch = useDispatch();
  const history = useHistory();
  const ui = useSelector((state) => state.ui);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: email.value,
      password: password.value,
    };
    dispatch(loginUser(userData, history));
  };
  return (
    <div className={classes.container}>
      <Card>
        <h2 className={classes.title}>Login</h2>

        <form noValidate onSubmit={handleSubmit}>
          <Input {...email} error={ui.errors.email} />
          <Input {...password} error={ui.errors.password} />
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
            dont have an account? sign up <Link to='/signup'>here</Link>
          </small>
        </form>
      </Card>
    </div>
  );
};

export default Login;
