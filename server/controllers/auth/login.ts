import { Request, Response } from 'express';
import { NextError } from '../../../interfaces/NextError';
import User from '../../models/User.model';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response, next: NextError) => {
  try {
    const { username, password }: { username?: string; password?: string } = req.body;
    if (!password || !username) {
      return next({ status: 400, message: 'Please provide both password and username.' });
    }
    const userData = await User.findOne({ username: { $eq: username } });
    if (userData) {
      const checkPassword = await bcrypt.compare(password, userData.password);
      const userInfo = {
        username: userData.username,
        id: userData._id,
      };
      req.session.user = userInfo;
      if (checkPassword) return res.status(200).json({ message: 'Authorization successful!' });
    }
    return next({
      status: 401,
      message: 'Provided password and username combination is incorrect!',
    });
  } catch {
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default login;
