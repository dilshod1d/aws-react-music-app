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
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import Copyright from './Copyright';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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

const ResetPassword = ({ authState, onStateChange }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [new_password, setNewPassword] = useState('');

  const resetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, code, new_password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    authState === 'resetPassword' && (
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
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='code'
              label='Confirmation Code'
              id='code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='new_password'
              label='New Password'
              type='password'
              id='password'
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Button
              // type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              id='signinButton'
              onClick={() => {
                resetPassword();
                onStateChange('signIn', {});
              }}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Button variant='text' size='small' color='primary'>
                  Resend code?
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='text'
                  size='small'
                  color='primary'
                  onClick={() => {
                    onStateChange('signIn', {});
                  }}
                >
                  {'Back to Signin'}
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

export default ResetPassword;
