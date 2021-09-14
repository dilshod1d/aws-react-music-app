import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright '} &copy;
      <Link color='inherit' to='/'>
        Aws musix
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
