import { Request, Response } from 'express';
import { NextError } from '../../interfaces/NextError';
import User from '../../models/User.model';

const getProfileDataById = async (req: Request, res: Response, next: NextError) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);
    console.log(userData)
    if (!userData) return next({ status: 404, message: 'User data not found.' });
    const profileDTO = {
      username: userData.username,
      avatar: userData.avatar,
    }
    return res.json(profileDTO);
  } catch {
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default getProfileDataById;
