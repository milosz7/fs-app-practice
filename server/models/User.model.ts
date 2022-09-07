import { Schema, model } from 'mongoose';
import { validatePhoneNumber, validateUsername } from '../../utils/helpers';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 16,
    validate: validateUsername,
  },
  password: { type: String, required: true },
  avatar: { type: String },
  phone: { type: String, validate: validatePhoneNumber },
});

interface UserModel {
  username: string;
  password: string;
  avatar: string;
  phone: string;
}

const User = model<UserModel>('User', userSchema);

export default User;
