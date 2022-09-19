import CenteringBox from '../Common/CenteringBox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundError = ({ title, message }: { title: string; message: string }) => {
  return (
    <CenteringBox>
      <Box textAlign="center">
        <Typography mb={1} variant="h4">
          {title}
        </Typography>
        <Typography mb={-4} color="action.active" variant="h6">
          {message}
        </Typography>
        <img
          style={{ width: '90vw', maxWidth: 400, objectFit: 'contain' }}
          src={process.env.PUBLIC_URL + '/images/error404.png'}
          alt="error404"
        />
      </Box>
      <Button component={RouterLink} to="/" sx={{ mt: -3 }} variant="contained">
        return to homepage
      </Button>
    </CenteringBox>
  );
};

export default NotFoundError;
