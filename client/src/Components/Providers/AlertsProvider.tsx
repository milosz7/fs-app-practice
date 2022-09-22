import { ReactNode, useState } from 'react';
import AlertsContext from '../../Context/AlertsContext';
import { errorAlertDisplayDurationInMs } from '../../constants';

const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const defaultSeverity = 'error'
  const [displayMessage, setMessageDisplay] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [messageSeverity, setMessageSeverity] = useState<'error' | 'info' | 'success' | 'warning'>(
    defaultSeverity
  );

  const closeAlert = () => {
    setMessageDisplay(false);
    setMessageSeverity(defaultSeverity);
  };

  const autoCloseAlert = () => {
    setTimeout(() => {
      setMessageDisplay(false);
      setMessageSeverity(defaultSeverity)
    }, errorAlertDisplayDurationInMs);
  };

  return (
    <AlertsContext.Provider
      value={{
        displayMessage,
        displayedMessage,
        messageSeverity,
        setMessageDisplay,
        setDisplayedMessage,
        setMessageSeverity,
        closeAlert,
        autoCloseAlert,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
