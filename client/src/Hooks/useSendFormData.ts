import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../Context/LoadingContext';
import AlertsContext from '../Context/AlertsContext';
import AdsContext from '../Context/AdsContext';
import LocalAdDataContext from '../Context/LocalAdDataContext';
import { defaultAdValue } from '../constants';

const useSendFormData = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext)!;
  const { setDisplayedMessage, setMessageDisplay, setMessageSeverity } = useContext(AlertsContext)!;
  const { fetchAdsToState } = useContext(AdsContext)!;
  const { setLocalAdData } = useContext(LocalAdDataContext)!;
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
        setMessageDisplay(true);
        setLocalAdData(defaultAdValue);
        await fetchAdsToState('');
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
