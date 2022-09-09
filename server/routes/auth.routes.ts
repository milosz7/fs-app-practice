import express from 'express';
import authMethods from '../methods/auth.methods';
import { isLoggedIn } from '../utils/authentication-middleware';

const router = express.Router();

router.route('/register').post(authMethods.register);

router.route('/login').post(authMethods.login);

router.route('/logout').delete(isLoggedIn, authMethods.logout)

router.route('/user').get(isLoggedIn, authMethods.getUser);

export default router;
