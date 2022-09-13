import express from 'express';
import authMethods from '../methods/auth.methods';
import { isLoggedIn } from '../middlewares/authentication-middleware';
import { upload } from '../middlewares/upload';

const router = express.Router();

router.route('/register').post(upload.single('avatar'), authMethods.register);

router.route('/login').post(authMethods.login);

router.route('/logout').delete(isLoggedIn, authMethods.logout)

router.route('/user').get(isLoggedIn, authMethods.getUser);

export default router;
