import { useContext, useCallback } from 'react';
import AlertsContext from '../Context/AlertsContext';
import LoadingContext from '../Context/LoadingContext';

const useFetchUserData = () => {
  const { setLoading } = useContext(LoadingContext)!;
  const { displayError } = useContext(AlertsContext)!;
  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const status = response.status;
      if (status === 200) {
        const userData: { username: string; avatar: string; phone: string } = await response.json();
        setLoading(false);
        return userData;
      }
      const { message }: { message: string } = await response.json();
      throw new Error(message);
    } catch (e) {
      e instanceof Error
        ? displayError(e.message)
        : displayError('Failed to connect with the server.');
      setLoading(false);
      return null;
    }
  }, [setLoading, displayError]);
  return fetchUserData;
};

export default useFetchUserData;
