import { Request, Response } from 'express';
import { NextError } from '../../interfaces/NextError';

export const isLoggedIn = (req: Request, res: Response, next: NextError) => {
  if (!req.session.user) {
    return next({ status: 401, message: 'You have to be logged in.' });
  }
  next();
};
