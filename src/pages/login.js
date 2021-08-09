import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import useField from '../hooks/useField';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const Login = (props) => {
  const email = useField('email', 'Email');
  const password = useField('password', 'Password');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      email: email.value,
      password: password.value,
    };
    dispatch(loginUser(userData, props.history));

    // try {
    //   const res = await axios.post('/login', userData);
    //   console.log(res.data);
    //   localStorage.setItem('FBToken', `Bearer ${res.data.token}`);
    //   setLoading(false);
    //   props.history.push('/');
    // } catch (err) {
    //   setErrors(err.response.data);
    //   setLoading(false);
    // }
  };
  return (
    <Grid container className='form'>
      <Grid item sm></Grid>
      <Grid item sm sx={12}>
        <Typography variant='h2'>Login</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            className='textField'
            {...email}
            helperText={ui.errors.email}
            error={ui.errors.email ? true : false}
            fullWidth
          />

          <TextField
            className='textField'
            {...password}
            helperText={ui.errors.password}
            error={ui.errors.password ? true : false}
            fullWidth
          />
          {ui.errors.general && (
            <Typography variant='body2' className='customError'>
              {ui.errors.general}
            </Typography>
          )}
          <Button
            className='button'
            type='submit'
            variant='contained'
            color='primary'
            disabled={ui.loading}
          >
            Login
            {ui.loading && <CircularProgress className='progress' size={30} />}
          </Button>
          <br />
          <small>
            dont have an account? sign up <Link to='/signup'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

export default Login;
