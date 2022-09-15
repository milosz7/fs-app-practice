import mongoose from 'mongoose';

export interface AdData {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  published: string;
  image: string;
  price: number;
  location: string;
  seller: { username: string; avatar: string; phone: string };
}

export interface AdsContextInterface {
  ads: AdData[];
  removeAd: (id: string) => void;
  addNewAd: (data: AdData) => void;
  editAd: (id: string, data: AdData) => void;
}
