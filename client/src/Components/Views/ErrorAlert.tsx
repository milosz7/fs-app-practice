import Alert from '@mui/material/Alert';
import { useContext, useEffect } from 'react';
import ErrorsContext from '../../Context/ErrorsContext';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';

const ErrorAlert = () => {
  const { displayError, errorMessage, closeError, autoCloseError } = useContext(ErrorsContext)!;
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.up('sm'));
  
  useEffect(() => {
    if (displayError) {
      autoCloseError();
    }
  }, [displayError, autoCloseError])

  return (
    <Box top={20} left="50%" sx={{transform:"translateX(-50%)", width: 400, maxWidth: '90vw'}} position="fixed" zIndex={999}>
      <Zoom in={displayError}>
      <Alert
        sx={{
          '& .MuiAlert-icon': {
            alignItems: 'center',
          },
        }}
        onClose={closeError}
        severity="error"
      >
        <Typography variant={isMedium ? 'body1' : 'body2'}>{errorMessage}</Typography>
      </Alert>
      </Zoom>
    </Box>
  );
};

export default ErrorAlert;
