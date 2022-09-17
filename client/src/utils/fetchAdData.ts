import { AdData } from "../Context/AdsContext";

const fetchAdData = async () => {
  const adsDataResp = await fetch('/api/ads', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const adsData: AdData[] = await adsDataResp.json();
  return adsData;
};

export default fetchAdData;
