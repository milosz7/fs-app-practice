import { Request, Response } from 'express';
import { NextError } from '../../../types/declaration';
import Ad from '../../models/Ad.model';

const getById = async (req: Request, res: Response, next: NextError) => {
  try {
    const requestedAdId = req.params.id;
    const requestedAd = await Ad.findById(requestedAdId);
    if (!requestedAd) {
      return next({ status: 404, message: `Ad with id: ${requestedAdId} does not exist!` });
    }
    return res.json(requestedAd);
  } catch {
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default getById;
