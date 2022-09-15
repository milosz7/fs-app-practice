import Navigation from './Components/Views/Navigation/Navigation';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AdData } from '../../interfaces/AdsContext';
import fetchAdData from './utils/fetchAdData';
import AdsContext from './Context/AdsContext';

const App = () => {
  const [ads, setAds] = useState<AdData[] | []>([]);

  useEffect(() => {
    const fetch = async () => {
      const adsData = await fetchAdData();
      setAds(adsData);
    };
    fetch();
  }, []);

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
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </AdsContext.Provider>
  );
};

export default App;
