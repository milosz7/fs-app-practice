import { ReactNode, useState } from 'react';
import ErrorsContext from '../../Context/ErrorsContext';
import { errorAlertDisplayDurationInMs } from '../../constants';

const ErrorsProvider = ({ children }: { children: ReactNode }) => {
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const closeError = () => {
    setDisplayError(false)
  }

  const autoCloseError = () => {
    setTimeout(() => {
      setDisplayError(false);
    }, errorAlertDisplayDurationInMs)
  }

  return (
    <ErrorsContext.Provider
      value={{ displayError, errorMessage, setDisplayError, setErrorMessage, closeError, autoCloseError }}
    >
      {children}
    </ErrorsContext.Provider>
  );
};

export default ErrorsProvider;
