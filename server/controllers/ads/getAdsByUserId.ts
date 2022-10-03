import { Request, Response } from 'express';
import { NextError } from '../../interfaces/NextError';
import Ad from '../../models/Ad.model';
import User from '../../models/User.model';
import { PopulatedAdData } from '../../interfaces/PopulatedAdData';

const getAdsByUserId = async (req: Request, res: Response, next: NextError) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);
    if (!userData) return next({ status: 404, message: 'User not found.' });
    const userAds = await Ad.find({ seller: { $eq: userData._id } })
      .sort({ _id: -1 })
      .populate<PopulatedAdData>({
        path: 'seller',
        model: User,
        select: ['avatar', 'username', 'phone'],
      });
    return res.json(userAds);
  } catch {
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default getAdsByUserId;
