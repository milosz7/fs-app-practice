import { Request, Response } from 'express';
import { NextError } from '../../../interfaces/NextError';
import Ad from '../../models/Ad.model';
import { createSearchQuery } from '../../utils/createSearchQuery';
import { AdData }from '../../../client/src/Context/AdsContext'
import User from '../../models/User.model';

const getAll = async (req: Request, res: Response, next: NextError) => {
  try {
    if (typeof req.query.search === 'string') {
      const requestedAds = await Ad.find({
        title: { $regex: createSearchQuery(req.query.search) },
      }).populate<AdData>({ path: 'seller', model: User, select: ['avatar', 'username', 'phone'] });
      if (!requestedAds.length) {
        return next({ status: 404, message: 'Could not find any ads data.' });
      }
      return res.json(requestedAds);
    }
    const allAds = await Ad.find({}).populate<AdData>({
      path: 'seller',
      model: User,
      select: ['avatar', 'username', 'phone'],
    });
    if (!allAds.length) return next({ status: 404, message: 'Could not find any ads data.' });
    return res.json(allAds);
  } catch {
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default getAll;
