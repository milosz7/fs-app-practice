import { Request, Response } from 'express';
import { NextError } from '../../../interfaces/NextError';

const logout = (req: Request, res: Response, next: NextError) => {
  req.session.destroy((err) => {
    if (err) {
      return next({ status: 500, message: 'Failed to log out.' });
    }
    return res.status(200).json({ message: 'You have been logged out.' });
  });
};

export default logout;
