import { Request, Response } from 'express';
import { NextError } from '../../../interfaces/NextError';
import { passedAdData } from '../../../interfaces/PassedAdData';
import { declareImageFileType } from '../../utils/fileFilter';
import { deleteFile } from '../../utils/deleteFile';
import Ad from '../../models/Ad.model';

const addNew = async (req: Request, res: Response, next: NextError) => {
  try {
    const uploadedImageType = req.file ? await declareImageFileType(req.file) : 'unknown';
    if (req.file && uploadedImageType === 'unknown') deleteFile(req.file.path);
    const newAdData: passedAdData = req.body;
    const { location, description, price, title } = newAdData;
    if (location && description && price && title) {
      const userId = req.session.user!.id;
      const newAd = new Ad({
        ...newAdData,
        seller: userId,
        published: new Date().toISOString(),
      });
      if (uploadedImageType !== 'unknown') {
        const relativeImagePath = req.file!.path.split('public')[1];
        newAd.image = relativeImagePath;
      }
      newAd.save();
      return res.status(200).json({ message: 'Success!' });
    }
    if (req.file) deleteFile(req.file.path);
    return next({ status: 400, message: 'Bad request.' });
  } catch {
    if (req.file) deleteFile(req.file.path);
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default addNew;
