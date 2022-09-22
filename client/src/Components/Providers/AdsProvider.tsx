import { ReactNode, useState, useEffect, useContext } from 'react';
import fetchAdData from '../../utils/fetchAdData';
import AdsContext, { AdData } from '../../Context/AdsContext';
import ErrorsContext from '../../Context/AlertsContext';
import LoadingContext from '../../Context/LoadingContext';

const AdsProvider = ({ children }: { children: ReactNode }) => {
  const { setLoading } = useContext(LoadingContext)!;
  const { setDisplayedMessage, setMessageDisplay } = useContext(ErrorsContext)!;

  const fetchAdsToState = async (query: string = '') => {
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
        setDisplayedMessage(output.message);
        setMessageDisplay(true);
      }
      setLoading(false);
    } catch {
      setDisplayedMessage('Failed to connect with the server.');
      setMessageDisplay(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdsToState();
  }, []);

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
