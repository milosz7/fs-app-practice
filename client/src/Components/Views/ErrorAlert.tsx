import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import ErrorsContext from '../../Context/ErrorsContext';
import { errorAlertDisplayDurationInMs } from '../../constants';

const ErrorAlert = () => {
  const { displayError, errorMessage, closeError } = useContext(ErrorsContext)!;

  return (
    <Snackbar
      open={displayError}
      onClose={closeError}
      autoHideDuration={errorAlertDisplayDurationInMs}
    >
      <Alert sx={{'& .MuiAlert-icon': {
        alignItems: 'center'
      }}} onClose={closeError} severity="error">{errorMessage}</Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
