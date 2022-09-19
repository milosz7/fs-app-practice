import { ReactNode, useState, useEffect } from 'react';
import fetchAdData from '../../utils/fetchAdData';
import AdsContext, { AdData } from '../../Context/AdsContext';

const AdsProvider = ({ children }: { children: ReactNode }) => {
  const fetchAdsToState = async (query: string = '') => {
    try {
      const adsData = await fetchAdData(query);
      setAds(adsData);
    } catch {
      return 'Failed to connect with the server.'
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
