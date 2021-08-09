import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import useField from '../hooks/useField';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

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
            {...handle}
            helperText={ui.errors.handle}
            error={ui.errors.handle ? true : false}
            fullWidth
          />

          <TextField
            className='textField'
            {...password}
            helperText={ui.errors.password}
            error={ui.errors.password ? true : false}
            fullWidth
          />
          <TextField
            className='textField'
            {...confirmPassword}
            helperText={ui.errors.confirmPassword}
            error={ui.errors.confirmPassword ? true : false}
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
            already have an account? log in <Link to='/login'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

export default Signup;
