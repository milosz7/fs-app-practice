import { useContext, useCallback } from 'react';
import LoadingContext from '../Context/LoadingContext';
import AlertsContext from '../Context/AlertsContext';
import { AdData } from '../Context/AdsContext';

const useGetProfileData = (): [
  (id: string) => Promise<AdData[]>,
  (id: string) => Promise<{ username: string; avatar: string } | null>
] => {
  const { setLoading } = useContext(LoadingContext)!;
  const { displayError } = useContext(AlertsContext)!;
  const getUserAds = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/ads/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const status = response.status;
        if (status === 200) {
          setLoading(false);
          const userAds: AdData[] = await response.json();
          return userAds;
        }
        const { message }: { message: string } = await response.json();
        throw new Error(message);
      } catch (e) {
        e instanceof Error
          ? displayError(e.message)
          : displayError('Failed to connect with the server.');
        setLoading(false);
        return [];
      }
    },
    [displayError, setLoading]
  );
  const getUserData = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/profile/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const status = response.status;
        if (status === 200) {
          setLoading(false)
          const userData: { username: string; avatar: string } = await response.json();
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
    },
    [setLoading, displayError]
  );
  return [getUserAds, getUserData];
};

export default useGetProfileData;
