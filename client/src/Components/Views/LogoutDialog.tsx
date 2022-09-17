import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogTransition from '../Features/DialogTransition';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';

const LogoutDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const shouldBeBigger = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog
      open={open}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={() => setOpen(false)}
    >
      <DialogContent sx={{ py: 4 }}>
        <DialogTitle sx={{ pt: 0 }} textAlign="center" fontSize={shouldBeBigger ? 20 : 18} >
          Are you sure you want to sign out?
        </DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button size={shouldBeBigger ? 'medium' : 'small'} variant="contained" color="success">
            sign out
          </Button>
          <Button size={shouldBeBigger ? 'medium' : 'small'} variant="contained" color="error">
            cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
