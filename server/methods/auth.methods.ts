import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validatePassword } from '../utils/helpers';
import User from '../models/User.model';
import { NextError } from '../../types/declaration';
import { declareImageFileType } from '../utils/fileFilter';
import { deleteFile } from '../utils/deleteFile';
import { createPhoneRegex } from '../utils/createPhoneRegex';;

const authMethods = {
  register: async (req: Request, res: Response, next: NextError) => {
    try {
      const fileType = req.file ? await declareImageFileType(req.file) : undefined;
      const { username, password, phone }: { username?: string; password?: string; phone: string } =
        req.body;
      if ((password && !validatePassword(password)) || !username || !phone || !password) {
        return next({ status: 400, message: 'Bad request.' });
      }
      const isUsernameTaken = await User.findOne({ username: { $eq: username } });
      if (isUsernameTaken) return next({ status: 409, message: 'Username is already taken.' });

      const isNumberTaken = await User.findOne({phone: {$regex: createPhoneRegex(phone)} })
      if (isNumberTaken) return next({ status: 409, message: 'Passed phone number is already being used.' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        password: hashedPassword,
        username,
        phone,
      });
      if (fileType === 'unknown') deleteFile(req.file!.path);
      if (fileType && fileType !== 'unknown') {
        const relativeFilePath = req.file!.path.split('public')[1];
        newUser.avatar = relativeFilePath;
      }
      await newUser.save();
      return res.status(200).json({ message: 'Success!' });
    } catch {
      return next({ status: 500, message: 'Internal server error.' });
    }
  },
  login: async (req: Request, res: Response, next: NextError) => {
    try {
      const { username, password }: { username?: string; password?: string } = req.body;
      if (!password || !username) {
        return next({ status: 400, message: 'Please provide both password and username.' });
      }
      const userData = await User.findOne({ username: { $eq: username } });
      if (userData) {
        const checkPassword = await bcrypt.compare(password, userData.password);
        const userInfo = {
          username: userData.username,
          id: userData._id,
        };
        req.session.user = userInfo;
        if (checkPassword) return res.status(200).json({ message: 'Authorization successful!' });
      }
      return next({
        status: 401,
        message: 'Provided password and username combination is incorrect!',
      });
    } catch {
      return next({ status: 500, message: 'Internal server error.' });
    }
  },
  logout: (req: Request, res: Response, next: NextError) => {
    req.session.destroy((err) => {
      if (err) {
        return next({ status: 500, message: 'Failed to log out.' });
      }
      return res.status(200).json({ message: 'You have been logged out.' });
    });
  },
  getUser: async (req: Request, res: Response, next: NextError) => {
    try {
      const userId = req.session.id;
      const userData = await User.findById(userId);
      if (userData) {
        const trimmedUserData = {
          username: userData.username,
          avatar: userData.avatar,
          phone: userData.phone,
        };
        return res.json(trimmedUserData);
      }
      return next();
    } catch {
      return next({ status: 500, message: 'Internal server error' });
    }
  },
};

export default authMethods;
