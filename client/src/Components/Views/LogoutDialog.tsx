import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogTransition from '../Features/DialogTransition';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { useContext, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FormHelperText } from '@mui/material';

const LogoutDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [error, setError] = useState(' ');

  const theme = useTheme();
  const shouldBeBigger = useMediaQuery(theme.breakpoints.up('sm'));
  
  const manageLogout = async () => {
    try {
      const message = await logout();
      if (message) {
        return setError(message);
      }
      navigate('/');
      setOpen(false);
    } catch {
      setError('Failed to connect with the server.')
    }
  }

  const handleClose = () => {
    setError(' ');
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={() => handleClose()}
    >
      <DialogContent sx={{ pt: 5, pb: 1 }}>
        <DialogTitle sx={{ pt: 0 }} textAlign="center" fontSize={shouldBeBigger ? 20 : 18} >
          Are you sure you want to sign out?
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => manageLogout()} size={shouldBeBigger ? 'medium' : 'small'} variant="contained" color="success">
            sign out
          </Button>
          <Button onClick={() => handleClose()} size={shouldBeBigger ? 'medium' : 'small'} variant="contained" color="error">
            cancel
          </Button>
        </DialogActions>
        <FormHelperText sx={{textAlign: 'center', pb: 1 }}>{error}</FormHelperText>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
