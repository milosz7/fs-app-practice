import { createContext } from 'react';

interface AlertsContextInterface {
  displayMessage: boolean;
  displayedMessage: string;
  messageSeverity: 'error' | 'info' | 'success' | 'warning';
  displayError: (message: string) => void;
  displaySuccess: (message: string) => void
  closeAlert: () => void;
  autoCloseAlert: () => void;
}

const AlertsContext = createContext<AlertsContextInterface | null>(null);

export default AlertsContext;
