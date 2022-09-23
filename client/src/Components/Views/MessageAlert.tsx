import Alert from '@mui/material/Alert';
import { useContext, useEffect, useState } from 'react';
import ErrorsContext from '../../Context/AlertsContext';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';
import { changeAlertZIndexDelayInMs } from '../../constants';

const MessageAlert = () => {
  const { messageSeverity, displayMessage, displayedMessage, closeAlert, autoCloseAlert } = useContext(ErrorsContext)!;
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.up('sm'));
  const [zIndex, setZIndex] = useState<1 | 1000>(1);
  
  useEffect(() => {
    if (displayMessage) {
      setZIndex(1000);
      autoCloseAlert();
      setTimeout(() => setZIndex(1), changeAlertZIndexDelayInMs)
    }
  }, [displayMessage, autoCloseAlert])
  
  return (
    <Box top={20} left="50%" sx={{transform:"translateX(-50%)", width: 400, maxWidth: '90vw'}} position="fixed" zIndex={zIndex}>
      <Zoom in={displayMessage}>
      <Alert
        sx={{
          '& .MuiAlert-icon': {
            alignItems: 'center',
          },
        }}
        onClose={closeAlert}
        severity={messageSeverity}
      >
        <Typography variant={isMedium ? 'body1' : 'body2'}>{displayedMessage}</Typography>
      </Alert>
      </Zoom>
    </Box>
  );
};

export default MessageAlert;
