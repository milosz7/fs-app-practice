import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { connectToDb } from './db-connect';
import authRoutes from './routes/auth.routes';

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/auth', authRoutes);
app.use('/', express.static(path.join(__dirname, '../client/build')));

app.use(
  (err: { status: number; message: string }, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
  }
);

app.use((req, res) => {
  return res.status(404).send({ message: 'Not found.' });
});

app.listen(8000, () => {
  console.log('Listening on port 8000.');
});
