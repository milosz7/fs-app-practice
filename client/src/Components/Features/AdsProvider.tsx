import { ReactNode, useState, useEffect } from 'react';
import fetchAdData from '../../utils/fetchAdData';
import { AdData } from '../../../../interfaces/AdsContext';
import AdsContext from '../../Context/AdsContext';

const AdsProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const fetch = async () => {
      const adsData = await fetchAdData();
      setAds(adsData);
    };
    fetch();
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
    <AdsContext.Provider value={{ ads, removeAd, addNewAd, editAd }}>
      {children}
    </AdsContext.Provider>
  );
};

export default AdsProvider;
