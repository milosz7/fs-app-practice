import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import FormBase from '../Common/FormBase';
import React, { useState, useId, useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const updateForm = (field: keyof typeof loginData, value: string) => {
    setLoginData({ ...loginData, [field]: value });
  };

  const [error, setError] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const message = await login(loginData);
    if (message) {
      return setError(message);
    }
    navigate('/');
  };

  return (
    <Box width="min(350px, calc(100vw - 30px))" textAlign="center">
      <FormBase error={error} onSubmit={handleSubmit} title="Enter account data:" buttonText="log in">
        <Box mb={1} mx='auto' sx={{ display: 'flex', alignItems: 'flex-end' }} component="div">
          <AccountCircleIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            value={loginData.username}
            onChange={(e) => updateForm('username', e.target.value)}
            autoComplete="off"
            id={useId()}
            label="Username"
            variant="standard"
          />
        </Box>
        <Box mb={1} mx='auto' sx={{ display: 'flex', alignItems: 'flex-end' }} component="div">
          <LockPersonIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            value={loginData.password}
            onChange={(e) => updateForm('password', e.target.value)}
            id={useId()}
            label="Password"
            variant="standard"
            type="password"
          />
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
          justifyContent: 'center'
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
