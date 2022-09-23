import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../Context/LoadingContext';
import AlertsContext from '../Context/AlertsContext';

const useSendFormData = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext)!;
  const { setDisplayedMessage, setMessageDisplay, setMessageSeverity } = useContext(AlertsContext)!;
  const upload = async (data: FormData, method: 'PUT' | 'POST', endpoint: string, redirect: string) => {
    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method,
        body: data,
      });
      const status = response.status;
      const { message }: { message: string; status: number } = await response.json();
      if (status === 200) {
        setMessageSeverity('success');
        setDisplayedMessage(message);
        setMessageDisplay(true)
        setLoading(false);
        return navigate(redirect);
      }
      throw new Error(message);
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) {
        setDisplayedMessage(e.message);
        setMessageDisplay(true);
      } else {
        setDisplayedMessage('Failed to connect with the server.');
        setMessageDisplay(true);
      }
    }
  };
  return upload;
};

export default useSendFormData;
