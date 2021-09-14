import { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';
import Copyright from './Copyright';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Auth } from 'aws-amplify';

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

const ForgotPassword = ({ authState, onStateChange }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');

  const forgotPassword = async () => {
    try {
      await Auth.forgotPassword(username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    authState === 'forgotPassword' && (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Reset Password
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Button
              // type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              id='forgotButton'
              onClick={() => {
                forgotPassword();
                onStateChange('resetPassword', {});
              }}
            >
              Send recovery code
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                  variant='text'
                  size='small'
                  color='primary'
                  onClick={() => onStateChange('signIn', {})}
                >
                  Back to Signin?
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

export default ForgotPassword;
