import { createContext } from 'react';

interface AlertsContextInterface {
  displayMessage: boolean;
  displayedMessage: string;
  setMessageDisplay: (display: boolean) => void;
  setDisplayedMessage: (message: string) => void;
  closeAlert: () => void;
  autoCloseAlert: () => void;
}

const AlertsContext = createContext<AlertsContextInterface | null>(null);

export default AlertsContext;
