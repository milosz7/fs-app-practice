import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import FormBase from '../Common/FormBase';
import PhoneIcon from '@mui/icons-material/Phone';
import React, { useId, useState, useContext } from 'react';
import { validateUsername, validatePassword, validatePhoneNumber } from '../../utils/validators';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { FormHelperText } from '@mui/material';
import ErrorsContext from '../../Context/ErrorsContext';

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    phone: '',
  });

  const { setErrorMessage, setDisplayError } = useContext(ErrorsContext)!;

  const [avatar, setAvatar] = useState<File | null>(null);

  const [serverResponse, setServerResponse] = useState('');

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    phone: false,
  });

  const register = async (newUser: { username: string; password: string; phone: string }) => {
    try {
      const formData = new FormData();
      (Object.keys(newUser) as (keyof typeof newUser)[]).forEach((key) => {
        formData.append(key, newUser[key]);
      });
      if (avatar) {
        formData.append('avatar', avatar);
      }
      const response = await fetch('/auth/register', {
        method: 'POST',
        body: formData,
      });
      const { message }: { message: string } = await response.json();
      setErrorMessage(message);
      setDisplayError(true);
    } catch {
      setErrorMessage('Failed to connect with the server.');
      setDisplayError(true);
    }
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await register(registerData);
  };

  const updateForm = (field: keyof typeof registerData, value: string | File) => {
    setRegisterData({ ...registerData, [field]: value });
    console.log(registerData);
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
      : updateErrors('phone', false);
    updateForm('phone', e.target.value);
  };

  return (
    <Box width="min(350px, calc(100vw - 30px))" textAlign="center" p={3}>
      <FormBase onSubmit={submit} title="Create an account:" buttonText="sign up">
        <Box
          mb={1}
          mx="auto"
          sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
          component="div"
        >
          <AccountCircleIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            sx={{ flexGrow: 1 }}
            value={registerData.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateUsername(e)}
            autoComplete="off"
            id={useId()}
            label="Username"
            variant="standard"
            FormHelperTextProps={!errors.username ? { style: { color: 'transparent' } } : undefined}
            helperText={'Must be between 3 and 16 characters.'}
          />
        </Box>
        <Box
          mb={1}
          mx="auto"
          sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
          component="div"
        >
          <LockPersonIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            sx={{ flexGrow: 1 }}
            value={registerData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePassword(e)}
            id={useId()}
            label="Password"
            variant="standard"
            type="password"
            FormHelperTextProps={!errors.password ? { style: { color: 'transparent' } } : undefined}
            helperText={'Must be 8 characters, 1 uppercase, 1 digit.'}
          />
        </Box>
        <Box
          mb={1}
          mx="auto"
          sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
          component="div"
        >
          <PhoneIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
          <TextField
            sx={{ flexGrow: 1 }}
            value={registerData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePhone(e)}
            id={useId()}
            label="Phone number"
            variant="standard"
            type="phone"
            FormHelperTextProps={!errors.phone ? { style: { color: 'transparent' } } : undefined}
            helperText={'Must be 9 digits, +48 prefix is optional.'}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <CameraAltIcon sx={{ color: 'action.active', mr: 1, mt: 3 }} />
          <Box
            mb={1}
            mt={2}
            mx="auto"
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '100%',
              flexDirection: 'column',
            }}
            component="div"
          >
            <Box
              component="label"
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                borderBottom: '1px solid',
                borderColor: 'action.active',
              }}
            >
              <Typography color="action.active" variant="body1">
                Profile picture
              </Typography>
              <Button sx={{ ml: 'auto', py: 0.5 }} component="label" variant="text">
                Upload
                <input
                  onChange={(e) => setAvatar(e.target.files![0])}
                  name="avatar"
                  hidden
                  accept="image/"
                  type="file"
                />
              </Button>
            </Box>
            <FormHelperText sx={{ ml: 0, mt: 0.25 }}>
              Profile picture is optional. (Max size is 2mb)
            </FormHelperText>
          </Box>
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
