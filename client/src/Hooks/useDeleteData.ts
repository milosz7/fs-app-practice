import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../Context/LoadingContext';
import AlertsContext from '../Context/AlertsContext';

const useDeleteAdData = () => {
  const { setLoading } = useContext(LoadingContext)!;
  const { setDisplayedMessage, setMessageDisplay, setMessageSeverity } = useContext(AlertsContext)!;
  const navigate = useNavigate();
  const deleteData = async (endpoint: string, redirect: string) => {
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const status = response.status;
      const { message }: { message: string } = await response.json();

      if (status === 200) {
        setMessageSeverity('success');
        setDisplayedMessage(message);
        setLoading(false);
        setMessageDisplay(true);
        navigate(redirect);
      }
      if (status !== 200) {
        throw new Error(message);
      }
    } catch (e) {
      setLoading(false);
      e instanceof Error
        ? setDisplayedMessage(e.message)
        : setDisplayedMessage('Failed to connect with the server');
      setMessageDisplay(true);
    }
  };
  return deleteData;
};

export default useDeleteAdData;
