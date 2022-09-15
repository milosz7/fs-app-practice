import { Request, Response } from 'express';
import { NextError } from '../../../interfaces/NextError';
import Ad from '../../models/Ad.model';

const deleteAd = async (req: Request, res: Response, next: NextError) => {
  try {
    const userId = req.session.user!.id;
    const adToDeleteId = req.params.id;
    const adToDelete = await Ad.findById(adToDeleteId);
    if (!adToDelete) {
      return next({ status: 404, message: `Ad with id: ${adToDeleteId} does not exist!` });
    }
    if (userId.toString() !== adToDelete.seller.toString()) {
      return next({ status: 401, message: 'You have no permission to do that!' });
    }
    await adToDelete.delete();
    return res.status(200).json({ message: 'Success!' });
  } catch {
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default deleteAd;
