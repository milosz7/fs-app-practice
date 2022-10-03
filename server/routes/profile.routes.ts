import express from 'express';
import getProfileDataById from '../controllers/profiles/getProfileDataById';

const router = express.Router();

router.route('/profile/:id').get(getProfileDataById);

export default router;
