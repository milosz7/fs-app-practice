import { createContext } from 'react';

interface AlertsContextInterface {
  displayMessage: boolean;
  displayedMessage: string;
  messageSeverity: 'error' | 'info' | 'success' | 'warning';
  setMessageDisplay: (display: boolean) => void;
  setDisplayedMessage: (message: string) => void;
  setMessageSeverity: (severity: 'error' | 'info' | 'success' | 'warning') => void;
  closeAlert: () => void;
  autoCloseAlert: () => void;
}

const AlertsContext = createContext<AlertsContextInterface | null>(null);

export default AlertsContext;
