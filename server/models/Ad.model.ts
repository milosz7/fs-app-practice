import { Schema, model, Types } from 'mongoose';
import { validateTitle } from '../utils/validators';

const adSchema = new Schema({
  title: { type: String, minLength: 10, maxLength: 50, required: true, validate: validateTitle },
  description: { type: String, minLength: 20, maxLength: 1000, required: true },
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
  price: number;
  location: string;
  seller: Types.ObjectId;
}

const Ad = model<AdModel>('Ad', adSchema);

export default Ad;
