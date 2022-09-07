import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectToDb } from './db-connect';

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/', express.static(path.join(__dirname, '../client/build')));

app.listen(8000, () => {
  console.log('Listening on port 8000.');
});
