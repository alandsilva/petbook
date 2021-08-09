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

const Login = (props) => {
  const email = useField('email', 'Email');
  const password = useField('password', 'Password');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await axios.post('/login', userData);
      console.log(res.data);
      setLoading(false);
      props.history.push('/');
    } catch (err) {
      setErrors(err.response.data);
      setLoading(false);
    }
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
            helperText={errors.email}
            error={errors.email ? true : false}
            fullWidth
          />

          <TextField
            className='textField'
            {...password}
            helperText={errors.password}
            error={errors.password ? true : false}
            fullWidth
          />
          {errors.general && (
            <Typography variant='body2' className='customError'>
              {errors.general}
            </Typography>
          )}
          <Button
            className='button'
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading}
          >
            Login
            {loading && <CircularProgress className='progress' size={30} />}
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
