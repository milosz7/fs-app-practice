import mongoose from 'mongoose';
import { useContext, useCallback } from 'react';
import AlertsContext from '../Context/AlertsContext';
import LoadingContext from '../Context/LoadingContext';
import AuthContext from '../Context/AuthContext';

const usePersistLogin = () => {
  const { displayError } = useContext(AlertsContext)!;
  const { setLoading } = useContext(LoadingContext)!;
  const { user } = useContext(AuthContext)!;

  const getUserData = useCallback(async () => {
    if (!user) {
      try {
        setLoading(true)
        const response = await fetch('/auth/is-logged', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const status = response.status;
        if (status === 200) {
          const userData: { username: string; id: mongoose.Types.ObjectId } | null = await response.json();
          setLoading(false)
          return userData;
        }
        setLoading(false)
        return null
      } catch {
        setLoading(false)
        displayError('Failed to fetch session data.');
        return null
      }
    }
  }, [user, setLoading, displayError])
  return getUserData;
};

export default usePersistLogin
