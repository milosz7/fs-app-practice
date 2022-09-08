import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validatePassword } from '../../utils/helpers';
import User from '../models/User.model';
import { NextError } from '../../types/declaration';

const authMethods = {
  register: async (req: Request, res: Response, next: NextError) => {
    try {
      const { username, password, phone }: { username?: string; password?: string; phone: string } =
        req.body;
      if ((password && !validatePassword(password)) || !username || !phone || !password) {
        return next({ status: 400, message: 'Bad request.' });
      }
      const isUsernameTaken = await User.findOne({ username: username });
      if (isUsernameTaken) return next({ status: 409, message: 'Username is already taken.' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        password: hashedPassword,
        username,
        phone,
      });
      await newUser.save();
      return res.status(200).json({ message: 'Success!' });
    } catch (e) {
      return next({ status: 500, message: 'Internal server error.' });
    }
  },
};

export default authMethods;
