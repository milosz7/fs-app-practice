import { createContext } from 'react';
import mongoose from 'mongoose';

export interface UserData {
  username: string;
  id: mongoose.Types.ObjectId;
}

export interface UserInput {
  username: string;
  password: string;
}

export interface AuthContextInterface {
  user: UserData | null;
  login: (user: UserInput) => Promise<string | undefined>
  logout: () => Promise<string | undefined>
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export default AuthContext