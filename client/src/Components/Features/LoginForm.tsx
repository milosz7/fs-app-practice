import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import FormBase from '../Common/FormBase';

const LoginForm = () => {
  return (
    <Box width="max-content" textAlign="center">
      <FormBase title="Enter account data:" buttonText="log in">
        <Box mb={1} sx={{ display: 'flex', alignItems: 'flex-end' }} component="div">
          <AccountCircleIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField autoComplete="off" id="username" label="Username" variant="standard" />
        </Box>
        <Box mb={1} sx={{ display: 'flex', alignItems: 'flex-end' }} component="div">
          <LockPersonIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField id="password" label="Password" variant="standard" type="password" />
        </Box>
      </FormBase>
      <Paper
        elevation={3}
        sx={{
          mt: 3,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography variant="body1">You don't have an account?</Typography>
        <Button component={RouterLink} to="/register" variant="text">
          <Typography fontWeight={700} variant="body1">
            Register
          </Typography>
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginForm;
