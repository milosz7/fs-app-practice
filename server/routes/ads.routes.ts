import express from 'express';
import { upload } from '../middlewares/upload';
import { isLoggedIn } from '../middlewares/authentication-middleware';
import getAll from '../controllers/ads/getAll';
import getById from '../controllers/ads/getById';
import addNew from '../controllers/ads/addNew';
import deleteAd from '../controllers/ads/delete';
import edit from '../controllers/ads/edit';
import getByUsername from '../controllers/ads/getByUsername';

const router = express.Router();

router.route('/ads').get(getAll);

router.route('/ads/user/:username').get(getByUsername);

router.route('/ads/:id').get(getById);

router.route('/ads').post(isLoggedIn, upload.single('image'), addNew);

router.route('/ads/:id').delete(isLoggedIn, deleteAd);

router.route('/ads/:id').put(isLoggedIn, upload.single('image'), edit);

export default router;
