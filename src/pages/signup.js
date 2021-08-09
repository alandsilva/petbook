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

const Signup = (props) => {
  const email = useField('email', 'Email');
  const handle = useField('text', 'Handle');
  const password = useField('password', 'Password');
  const confirmPassword = useField('password', 'Confirm Password');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      email: email.value,
      handle: handle.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    try {
      const res = await axios.post('/signup', userData);
      console.log(res.data);
      localStorage.setItem('FBToken', `Bearer ${res.data.token}`);
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
            {...handle}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            fullWidth
          />

          <TextField
            className='textField'
            {...password}
            helperText={errors.password}
            error={errors.password ? true : false}
            fullWidth
          />
          <TextField
            className='textField'
            {...confirmPassword}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
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
            already have an account? log in <Link to='/login'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

export default Signup;
