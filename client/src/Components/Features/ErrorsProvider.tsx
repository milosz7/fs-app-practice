import { ReactNode, useState } from 'react';
import ErrorsContext from '../../Context/ErrorsContext';
import { dataUpdateDelayInMs } from '../../constants';

const ErrorsProvider = ({ children }: { children: ReactNode }) => {
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const closeError = () => {
    setDisplayError(false)
  }

  return (
    <ErrorsContext.Provider
      value={{ displayError, errorMessage, setDisplayError, setErrorMessage, closeError }}
    >
      {children}
    </ErrorsContext.Provider>
  );
};

export default ErrorsProvider;
