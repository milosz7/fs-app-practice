import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogTransition from '../Features/DialogTransition';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { useContext } from 'react';
import DialogControlsContext from '../../Context/DialogControlsContext';

const ActionDialog = () => {
  const { dispatchAction, isDialogOpen, setIsDialogOpen, dialogTitle } = useContext(DialogControlsContext)!;
  const theme = useTheme();
  const shouldBeBigger = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog
      open={isDialogOpen}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={() => setIsDialogOpen(false)}
    >
      <DialogContent sx={{ pt: 3, pb: 1 }}>
        <DialogTitle sx={{ pt: 0 }} textAlign="center" fontSize={shouldBeBigger ? 20 : 18}>
         {dialogTitle}
        </DialogTitle>
        <DialogActions sx={{ pb: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => dispatchAction()}
            size={shouldBeBigger ? 'medium' : 'small'}
            variant="contained"
            color="success"
          >
            confirm
          </Button>
          <Button
            onClick={() => setIsDialogOpen(false)}
            size={shouldBeBigger ? 'medium' : 'small'}
            variant="contained"
            color="error"
          >
            cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
