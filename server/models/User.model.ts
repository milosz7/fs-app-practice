import { Schema, model } from 'mongoose';
import { validatePhoneNumber, validateUsername } from '../utils/helpers';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 16,
    validate: validateUsername,
    unique: true,
  },
  password: { type: String, required: true },
  avatar: { type: String, default: '/default-avatar.jpg' },
  phone: { type: String, validate: validatePhoneNumber, unique: true },
});

interface UserModel {
  username: string;
  password: string;
  avatar: string;
  phone: string;
}

const User = model<UserModel>('User', userSchema);

export default User;
