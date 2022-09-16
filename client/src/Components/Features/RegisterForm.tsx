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
import { FormHelperText } from '@mui/material';
import { validateUsername, validatePassword, validatePhoneNumber } from '../../utils/validators';

const RegisterForm = () => {

  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    phone: '',
  });

  const [serverResponse, setServerResponse] = useState('');

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    phone: false,
  });

  const register = async (newUser: {
    username: string;
    password: string;
    phone: string;
    file?: File;
  }) => {
    console.log(newUser)
    const response = await fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { message }: { message: string } = await response.json();
    setServerResponse(message)
  };
  
  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    register(registerData)
  };




  const updateForm = (field: keyof typeof registerData, value: string) => {
    setRegisterData({ ...registerData, [field]: value });
    console.log(registerData, errors)
  };

  const updateErrors = (field: keyof typeof errors, value: boolean) => {
    setErrors({ ...errors, [field]: value });
  };

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    !validateUsername(e.target.value)
      ? updateErrors('username', true)
      : updateErrors('username', false);
    updateForm('username', e.target.value);
  };

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    !validatePassword(e.target.value)
      ? updateErrors('password', true)
      : updateErrors('password', false);
    updateForm('password', e.target.value);
  };

  const updatePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    !validatePhoneNumber(e.target.value)
      ? updateErrors('phone', true)
      : updateErrors('password', false);
    updateForm('phone', e.target.value);
  };

  return (
    <Box width="min(350px, calc(100vw - 30px))" textAlign="center" p={3}>
      <FormBase error={serverResponse} onSubmit={submit} title="Create an account:" buttonText="sign up">
        <Box mb={1} mx="auto" sx={{ display: 'flex', alignItems: 'center', width: '100%' }} component="div">
          <AccountCircleIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            sx={{flexGrow: 1}}
            value={registerData.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateUsername(e)}
            autoComplete="off"
            id={useId()}
            label="Username"
            variant="standard"
            FormHelperTextProps={!errors.username ? {style: {color: 'transparent'}} : undefined}
            helperText={'Must be between 3 and 16 characters.'}
          />
        </Box>
        <Box mb={1} mx="auto" sx={{ display: 'flex', alignItems: 'center', width: '100%' }} component="div">
          <LockPersonIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            sx={{flexGrow: 1}}
            value={registerData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePassword(e)}
            id={useId()}
            label="Password"
            variant="standard"
            type="password"
            FormHelperTextProps={!errors.password ? {style: {color: 'transparent'}} : undefined}
            helperText={'Min length 8, 1 uppercase character, 1 digit'}
          />
        </Box>
        <Box mb={1} mx="auto" sx={{ display: 'flex', alignItems: 'center', width: '100%' }} component="div">
          <PhoneIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            sx={{flexGrow: 1}}
            value={registerData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePhone(e)}
            id={useId()}
            label="Phone number"
            variant="standard"
            type="phone"
            FormHelperTextProps={!errors.phone ? {style: {color: 'transparent'}} : undefined}
            helperText={'Must be 9 digits, +48 prefix is optional'}
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
