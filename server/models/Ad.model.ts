import { Schema, model, Types } from 'mongoose';

const adSchema = new Schema({
  title: { type: String, minLength: 10, maxLength: 50, required: true },
  description: { type: String, minLength: 20, maxLength: 2000, required: true },
  published: { type: String, required: true },
  image: { type: String, default: '/no-image.jpg' },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  seller: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

interface AdModel {
  title: string;
  description: string;
  published: string;
  image?: string;
  price: string;
  location: string;
  seller: Types.ObjectId;
}

const Ad = model<AdModel>('Ad', adSchema);

export default Ad;
