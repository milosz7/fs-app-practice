import { Request, Response } from 'express';
import { NextError } from '../../../types/declaration';
import { declareImageFileType } from '../../utils/fileFilter';
import { validatePassword } from '../../utils/validators';
import { deleteFile } from '../../utils/deleteFile';
import User from '../../models/User.model';
import bcrypt from 'bcrypt';
import { createPhoneRegex } from '../../utils/createPhoneRegex';

const register = async (req: Request, res: Response, next: NextError) => {
  try {
    const fileType = req.file ? await declareImageFileType(req.file) : 'unknown';
    const { username, password, phone }: { username?: string; password?: string; phone: string } =
      req.body;
    if ((password && !validatePassword(password)) || !username || !phone || !password) {
      return next({ status: 400, message: 'Bad request.' });
    }
    const isUsernameTaken = await User.findOne({ username: { $eq: username } });
    if (isUsernameTaken) {
      if (req.file) deleteFile(req.file.path);
      return next({ status: 409, message: 'Username is already taken.' });
    }

    const isNumberTaken = await User.findOne({ phone: { $regex: createPhoneRegex(phone) } });
    if (isNumberTaken) {
      if (req.file) deleteFile(req.file.path);
      return next({ status: 409, message: 'Passed phone number is already being used.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      password: hashedPassword,
      username,
      phone,
    });
    if (fileType === 'unknown') deleteFile(req.file!.path);
    if (fileType !== 'unknown') {
      const relativeFilePath = req.file!.path.split('public')[1];
      newUser.avatar = relativeFilePath;
    }
    await newUser.save();
    return res.status(200).json({ message: 'Success!' });
  } catch {
    if (req.file) deleteFile(req.file.path);
    return next({ status: 500, message: 'Internal server error.' });
  }
};

export default register;
