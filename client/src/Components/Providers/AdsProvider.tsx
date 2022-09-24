import { ReactNode, useState, useEffect, useContext, useCallback } from 'react';
import fetchAdData from '../../utils/fetchAdData';
import AdsContext, { AdData } from '../../Context/AdsContext';
import ErrorsContext from '../../Context/AlertsContext';
import LoadingContext from '../../Context/LoadingContext';

const AdsProvider = ({ children }: { children: ReactNode }) => {
  const { setLoading } = useContext(LoadingContext)!;
  const { displayError } = useContext(ErrorsContext)!;

  const fetchAdsToState = useCallback(async (query: string = '') => {
    try {
      setLoading(true);
      const { output, status } = await fetchAdData(query);
      if (Array.isArray(output)) {
        setAds(output);
        setLoading(false);
        return null;
      }
      setAds([]);
      if (status !== 200) {
        throw new Error(output.message);
      }
    } catch (e) {
      e instanceof Error
        ? displayError(e.message)
        : displayError('Failed to connect with the server.');
      setLoading(false);
    }
  }, [setLoading, displayError]);

  useEffect(() => {
    fetchAdsToState();
  }, [fetchAdsToState]);

  const [ads, setAds] = useState<AdData[] | []>([]);

  const removeAd = (id: string) => {
    setAds(ads.filter((ad) => id !== ad._id.toString()));
  };

  const addNewAd = (adData: AdData) => {
    setAds([...ads, adData]);
  };

  const editAd = (id: string, data: AdData) => {
    setAds(ads.map((ad) => (ad._id.toString() === id ? { ad, ...data } : ad)));
  };

  return (
    <AdsContext.Provider value={{ ads, removeAd, addNewAd, editAd, fetchAdsToState }}>
      {children}
    </AdsContext.Provider>
  );
};

export default AdsProvider;
