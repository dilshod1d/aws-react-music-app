import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import {
  Authenticator,
  // ConfirmSignUp,
  Greetings,
} from 'aws-amplify-react';
import Signin from './Signin';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import { Button } from '@material-ui/core';
import User from './User';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Account = (props) => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then((userData) => {
        console.log(userData.username);
        setUser(userData);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  };
  useEffect(() => {
    assessLoggedInState();
    return () => {
      setUser();
      setLoggedIn();
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Authenticator
        hideDefault={true}
        authState={authState}
        onStateChange={(authStateChange) => setAuthState(authStateChange)}
      >
        <User user={user} />
        <Signin onSignin={assessLoggedInState} />
        <ForgotPassword />
        <ResetPassword />
        <SignUp />
        <ConfirmSignUp />
      </Authenticator>
    </div>
  );
};

export default Account;
