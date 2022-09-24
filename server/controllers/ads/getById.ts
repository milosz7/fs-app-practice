import { Request, Response } from 'express';
import { NextError } from '../../interfaces/NextError';
import Ad from '../../models/Ad.model';
import { PopulatedAdData } from '../../interfaces/PopulatedAdData';
import User from '../../models/User.model';

const getById = async (req: Request, res: Response, next: NextError) => {
  try {
    const requestedAdId = req.params.id;
    const requestedAd = await Ad.findById(requestedAdId).populate<PopulatedAdData>({
      path: 'seller',
      model: User,
      select: ['avatar', 'username', 'phone'],
    });
    if (!requestedAd) {
      return next({ status: 404, message: `Ad with id: ${requestedAdId} does not exist!` });
    }
    return res.json(requestedAd);
  } catch {
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default getById;
