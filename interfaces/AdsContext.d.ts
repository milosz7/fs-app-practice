export interface AdData {
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
  editAd: (id: string) => void;
}