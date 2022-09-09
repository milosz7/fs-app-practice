import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { connectToDb } from './db-connect';
import authRoutes from './routes/auth.routes';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
}

app.use('/auth', authRoutes);
app.use('/', express.static(path.join(__dirname, '../client/build')));

app.use(
  (err: { status: number; message: string }, req: Request, res: Response, next: NextFunction) => {
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
