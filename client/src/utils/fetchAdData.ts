import { AdData } from '../Context/AdsContext';

const fetchAdData = async (searchQuery: string = '') => {
  const adsDataResp = await fetch('/api/ads' + (searchQuery ? '?search=' + searchQuery : ''), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const status = adsDataResp.status;
  const output: AdData[] | { message: string } = await adsDataResp.json();
  return { output, status };
};

export default fetchAdData;
