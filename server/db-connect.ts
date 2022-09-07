import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const declareUri = () => {
  return process.env.NODE_ENV === 'development'
    ? process.env.DB_DEV_CONN_STR
    : process.env.DB_PROD_CONN_STR;
};

export const connectToDb = async () => {
  const db = mongoose.connection;
  db.once('connected', () => {
    console.log('Connected to database.');
  });
  db.on('error', () => {
    console.log('Failed to connect.');
  });
  
  await mongoose.connect(declareUri());
};
