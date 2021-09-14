import { useState, useEffect } from 'react';
import './App.css';
import {
  withAuthenticator,
  AmplifySignOut,
  AmplifyAuthenticator,
} from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import awsExports from './aws-exports';
import MusicList from './components/MusicList';
import { Button } from '@material-ui/core';
import { Switch, Route, Link } from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import ConfirmSignUp from './components/ConfirmSignUp';
import {
  Authenticator,
  // ConfirmSignUp,
  Greetings,
} from 'aws-amplify-react';
import Account from './components/Account';

Amplify.configure(awsExports);

function App() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then((userData) => {
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
    <div className='App'>
      <Navbar loggedIn={authState} user={user} />
      <Switch>
        <Route exact path='/'>
          <MusicList />
        </Route>
        <Route path='/account'>
          <Account user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
