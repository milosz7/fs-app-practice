import { Request, Response } from 'express';
import { passedAdData, NextError } from '../../types/declaration';
import Ad from '../models/Ad.model';
import { createSearchQuery } from '../utils/createSearchQuery';
import { declareImageFileType } from '../utils/fileFilter';
import { deleteFile } from '../utils/deleteFile';
import { isImageUploaded } from '../utils/isImageUploaded';

const adsMethods = {
  getAll: async (req: Request, res: Response, next: NextError) => {
    try {
      if (typeof req.query.search === 'string') {
        const requestedAds = await Ad.find({
          title: { $regex: createSearchQuery(req.query.search) },
        });
        if (!requestedAds.length) {
          return next({ status: 404, message: 'Could not find any ads data.' });
        }
        return res.json(requestedAds);
      }
      const allAds = await Ad.find({});
      if (!allAds.length) return next({ status: 404, message: 'Could not find any ads data.' });
      return res.json(allAds);
    } catch {
      return next({ status: 500, message: 'Internal server error.' });
    }
  },
  getById: async (req: Request, res: Response, next: NextError) => {
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
  },
  addNew: async (req: Request, res: Response, next: NextError) => {
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
  },
  edit: async (req: Request, res: Response, next: NextError) => {
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
      await adToEdit.save();
      return res.status(200).json({ message: 'Success!' });
    } catch (e) {
      if (req.file) deleteFile(req.file.path);
      return next({ status: 500, message: 'Internal server error.' });
    }
  },
  delete: async (req: Request, res: Response, next: NextError) => {
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
  },
};

export default adsMethods;
