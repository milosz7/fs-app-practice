import express from 'express';
import adsMethods from '../methods/ads.methods';
import { upload } from '../middlewares/upload';
import { isLoggedIn } from '../middlewares/authentication-middleware';

const router = express.Router();

router.route('/ads').get(adsMethods.getAll);

router.route('/ads/:id').get(adsMethods.getById);

router.route('/ads').post(isLoggedIn, upload.single('image'), adsMethods.addNew);

router.route('/ads/:id').delete(isLoggedIn, adsMethods.delete);

router.route('/ads/:id').put(isLoggedIn, upload.single('image'), adsMethods.edit);

export default router;
