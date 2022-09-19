import { createContext } from 'react';

interface ErrorsContextInterface {
  displayError: boolean;
  errorMessage: string;
  setDisplayError: (display: boolean) => void;
  setErrorMessage: (message: string) => void;
  closeError: () => void;
}

const ErrorsContext = createContext<ErrorsContextInterface | null>(null);

export default ErrorsContext;
