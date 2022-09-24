export interface PopulatedAdData {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  published: string;
  image: string;
  price: number;
  location: string;
  seller: { _id: mongoose.Types.ObjectId; username: string; avatar: string; phone: string };
}
