import { ReactNode, useState } from 'react';
import AlertsContext from '../../Context/AlertsContext';
import { errorAlertDisplayDurationInMs } from '../../constants';

const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [displayMessage, setMessageDisplay] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');

  const closeAlert = () => {
    setMessageDisplay(false)
  }

  const autoCloseAlert = () => {
    setTimeout(() => {
      setMessageDisplay(false);
    }, errorAlertDisplayDurationInMs)
  }

  return (
    <AlertsContext.Provider
      value={{ displayMessage, displayedMessage, setMessageDisplay, setDisplayedMessage, closeAlert, autoCloseAlert }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
