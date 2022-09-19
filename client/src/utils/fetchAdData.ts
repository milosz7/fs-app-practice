import { AdData } from '../Context/AdsContext';

const fetchAdData = async (searchQuery: string = '') => {
  const adsDataResp = await fetch('/api/ads' + (searchQuery ? '?search=' + searchQuery : ''), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const adsData: AdData[] | {message: string} = await adsDataResp.json();
  return adsData;
};

export default fetchAdData;
