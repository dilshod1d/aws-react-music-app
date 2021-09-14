import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';

import { Link as MUILink } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = ({ onSignin, onStateChange, authState }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const signIn = async () => {
    try {
      const user = await Auth.signIn(username, password);
      history.push('/');
      onSignin();
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  return (
    authState === 'signIn' && (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='email'
              autoComplete='username'
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              // type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              id='signinButton'
              onClick={signIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                  variant='text'
                  size='small'
                  color='primary'
                  onClick={() => onStateChange('forgotPassword', {})}
                >
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='text'
                  size='small'
                  color='primary'
                  onClick={() => {
                    onStateChange('signUp', {});
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )
  );
};

export default Signin;

// <div className='login'>
//   <TextField
//     id='username'
//     label='Username'
//     value={username}
//     onChange={(e) => setUsername(e.target.value)}
//   />
//   <TextField
//     id='password'
//     label='Password'
//     type='password'
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
//   <Button id='signinButton' color='primary' onClick={signIn}>
//     Sign In
//   </Button>
// </div>
