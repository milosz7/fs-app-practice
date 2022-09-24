import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../Context/LoadingContext';
import AlertsContext from '../Context/AlertsContext';
import AdsContext from '../Context/AdsContext';

const useSendFormData = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext)!;
  const { displayError, displaySuccess } = useContext(AlertsContext)!;
  const { fetchAdsToState } = useContext(AdsContext)!;
  const upload = async (
    data: FormData,
    method: 'PUT' | 'POST',
    endpoint: string,
    redirect: string
  ) => {
    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method,
        body: data,
      });
      const status = response.status;
      const { message }: { message: string; status: number } = await response.json();
      if (status === 200) {
        displaySuccess(message);
        await fetchAdsToState('');
        return navigate(redirect);
      }
      throw new Error(message);
    } catch (e) {
      setLoading(false);
      e instanceof Error
        ? displayError(e.message)
        : displayError('Failed to connect with the server.');
    }
  };
  return upload;
};

export default useSendFormData;
