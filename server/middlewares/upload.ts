import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    const uniqueName =
      file.fieldname + Date.now() + Math.round(Math.random() * 1e6) + '.' + extension;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage: storage, limits: {fileSize: 2097152} });
