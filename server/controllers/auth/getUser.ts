import { Request, Response } from 'express';
import { NextError } from '../../../types/declaration';
import User from '../../models/User.model';

const getUser = async (req: Request, res: Response, next: NextError) => {
  try {
    const userId = req.session.id;
    const userData = await User.findById(userId);
    if (userData) {
      const trimmedUserData = {
        username: userData.username,
        avatar: userData.avatar,
        phone: userData.phone,
      };
      return res.json(trimmedUserData);
    }
    return next({ status: 404, message: 'User data not found.' });
  } catch {
    return next({ status: 500, message: 'Internal server error' });
  }
};

export default getUser;
