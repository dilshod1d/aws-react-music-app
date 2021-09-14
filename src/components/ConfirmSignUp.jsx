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
import { useState } from 'react';
import Copyright from './Copyright';
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

const ConfirmSignUp = ({ authState, onStateChange }) => {
  const classes = useStyles();
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  return (
    authState === 'confirmSignUp' && (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h5' variant='h5'>
            We have sent your email a confirmation code. Please enter the code.
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
              label='Code'
              id='code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              // type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              id='confirmButton'
              onClick={() => {
                confirmSignUp();
                onStateChange('signIn', {});
              }}
            >
              Confirm
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )
  );
};

export default ConfirmSignUp;
