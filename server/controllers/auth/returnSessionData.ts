import { Request, Response } from 'express';
import { NextError } from '../../interfaces/NextError';

const returnSessionData = async (req: Request, res: Response, next: NextError) => {
  try {
    if (req.session.user) {
      return res.json(req.session.user);
    }
    return res.status(200).send(false);
  } catch {
    return next({ status: 500, message: 'Internal server error' });
  }
};

export default returnSessionData;
