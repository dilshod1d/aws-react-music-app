import { Button } from '@material-ui/core';
import { Auth } from 'aws-amplify';

const User = ({ authState, user }) => {
  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out', error);
    }
  };
  return (
    authState === 'signedIn' && (
      <div>
        <div>Welcome {user?.username}!</div>
        <Button variant='contained' color='primary' onClick={signOut}>
          Log Out
        </Button>
      </div>
    )
  );
};

export default User;
