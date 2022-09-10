import express from 'express'
import adsMethods from '../methods/ads.methods';

const router = express.Router();

router.route('/ads').get();

router.route('/ads/:id').get();

router.route('/ads').post();

router.route('/ads/:id').delete();

router.route('/ads/:id').put();

export default router;
