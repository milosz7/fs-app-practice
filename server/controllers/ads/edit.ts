import { Request, Response } from 'express';
import { NextError } from '../../../interfaces/NextError';
import { passedAdData } from '../../../interfaces/PassedAdData';
import { declareImageFileType } from '../../utils/fileFilter';
import { deleteFile } from '../../utils/deleteFile';
import Ad from '../../models/Ad.model';
import { isImageUploaded } from '../../utils/isImageUploaded';

const edit = async (req: Request, res: Response, next: NextError) => {
  try {
    const uploadedImageType = req.file ? await declareImageFileType(req.file) : 'unknown';
    if (req.file && uploadedImageType === 'unknown') deleteFile(req.file.path);

    const userId = req.session.user!.id;
    const adToEditId = req.params.id;
    const editedData: passedAdData = req.body;
    const possibleFields = ['title', 'description', 'price', 'location'];
    const adToEdit = await Ad.findById(adToEditId);
    if (!adToEdit) {
      if (req.file) deleteFile(req.file.path);
      return next({ status: 404, message: 'Not found.' });
    }
    if (adToEdit.seller.toString() !== userId.toString()) {
      if (req.file) deleteFile(req.file.path);
      return next({ status: 401, message: 'You have no permission to do that!' });
    }
    (Object.keys(editedData) as (keyof typeof editedData)[]).forEach((key) => {
      if (possibleFields.includes(key)) {
        (adToEdit[key] as string) = editedData[key];
      }
    });

    if (uploadedImageType !== 'unknown') {
      if (isImageUploaded(adToEdit.image)) deleteFile(process.cwd() + '/public' + adToEdit.image);
      const relativeImagePath = req.file!.path.split('public')[1];
      adToEdit.image = relativeImagePath;
    }
    adToEdit.published = new Date().toISOString();
    await adToEdit.save();
    return res.status(200).json({ message: 'Success!' });
  } catch (e) {
    if (req.file) deleteFile(req.file.path);
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default edit;
