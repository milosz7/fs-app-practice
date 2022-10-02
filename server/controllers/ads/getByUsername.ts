import { Request, Response } from 'express';
import { NextError } from '../../interfaces/NextError';
import Ad from '../../models/Ad.model';
import User from '../../models/User.model';
import { PopulatedAdData } from '../../interfaces/PopulatedAdData';

const getByUsername = async (req: Request, res: Response, next: NextError) => {
  try {
    const username = req.params.username;
    const userData = await User.findOne({ username: { $eq: username } }).collation({
      locale: 'en_US',
      strength: 2,
    });
    if (!userData) return next({ status: 404, message: 'User not found.' });
    const userAds = await Ad.find({ seller: { $eq: userData._id } })
      .sort({ _id: -1 })
      .populate<PopulatedAdData>({
        path: 'seller',
        model: User,
        select: ['avatar', 'username', 'phone'],
      });
    if (!userAds.length)
      return next({ status: 200, message: 'There are no ads posted by this user avaliable.' });
    return res.json(userAds);
  } catch {
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default getByUsername;
