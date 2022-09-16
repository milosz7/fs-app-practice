import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import FormBase from '../Common/FormBase';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import React, { useId, useState } from 'react';

const RegisterForm = () => {
  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert('test');
  };

  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
  });

  const updateForm = (field: keyof typeof registerData, value: string) => {
    setRegisterData({ ...registerData, [field]: value });
  };

  // const register = async (newUser: {
  //   username: string;
  //   password: string;
  //   phone: string;
  //   file?: File;
  // }) => {
  //   const response = await fetch('/auth/register', {
  //     method: 'POST',
  //     body: JSON.stringify(newUser),
  //   });
  //   const { message }: { message: string } = await response.json();
  //   return message
  // };

  return (
    <Box width="min(350px, calc(100vw - 30px))" textAlign="center" p={3}>
      <FormBase error="" onSubmit={submit} title="Create an account:" buttonText="sign up">
        <Box mb={1} mx="auto" sx={{ display: 'flex', alignItems: 'flex-end' }} component="div">
          <AccountCircleIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            value={registerData.username}
            onChange={(e) => updateForm('username', e.target.value)}
            autoComplete="off"
            id={useId()}
            label="Username"
            variant="standard"
          />
        </Box>
        <Box mb={1} mx="auto" sx={{ display: 'flex', alignItems: 'flex-end' }} component="div">
          <LockPersonIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            value={registerData.password}
            onChange={(e) => updateForm('password', e.target.value)}
            id={useId()}
            label="Password"
            variant="standard"
            type="password"
          />
        </Box>
        <Box mb={1} mx="auto" sx={{ display: 'flex', alignItems: 'flex-end' }} component="div">
          <PhoneIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            value={registerData.phone}
            onChange={(e) => updateForm('phone', e.target.value)}
            id={useId()}
            label="Phone number"
            variant="standard"
            type="phone"
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
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1">Already have an account?</Typography>
        <Button component={RouterLink} to="/login" variant="text">
          <Typography fontWeight={700} variant="body1">
            Log in
          </Typography>
        </Button>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
