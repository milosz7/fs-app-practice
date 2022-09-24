import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../Context/LoadingContext';
import AlertsContext from '../Context/AlertsContext';
import AdsContext from '../Context/AdsContext';

const useDeleteAdData = () => {
  const { setLoading } = useContext(LoadingContext)!;
  const { displayError, displaySuccess } = useContext(AlertsContext)!;
  const { fetchAdsToState } = useContext(AdsContext)!;
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
        displaySuccess(message);
        fetchAdsToState('');
        setLoading(false);
        navigate(redirect);
      }
      if (status !== 200) {
        throw new Error(message);
      }
    } catch (e) {
      e instanceof Error
        ? displayError(e.message)
        : displayError('Failed to connect with the server');
      setLoading(false);
    }
  };
  return deleteData;
};

export default useDeleteAdData;
