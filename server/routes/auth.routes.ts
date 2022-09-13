import express from 'express';
import { isLoggedIn } from '../middlewares/authentication-middleware';
import { upload } from '../middlewares/upload';
import register from '../controllers/auth/register';
import login from '../controllers/auth/login';
import logout from '../controllers/auth/logout';
import getUser from '../controllers/auth/getUser';

const router = express.Router();

router.route('/register').post(upload.single('avatar'), register);

router.route('/login').post(login);

router.route('/logout').delete(isLoggedIn, logout);

router.route('/user').get(isLoggedIn, getUser);

export default router;
