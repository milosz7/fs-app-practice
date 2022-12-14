import { createContext } from 'react';
import mongoose from 'mongoose';

export interface AdData {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  published: string;
  image: string;
  price: number;
  location: string;
  seller: {_id: mongoose.Types.ObjectId; username: string; avatar: string; phone: string };
}

interface AdsContextInterface {
  ads: AdData[];
  removeAd: (id: string) => void;
  addNewAd: (data: AdData) => void;
  editAd: (id: string, data: AdData) => void;
  fetchAdsToState: (query: string | '') => Promise<void | null>
}

const AdsContext = createContext<AdsContextInterface | null>(null);

export default AdsContext;