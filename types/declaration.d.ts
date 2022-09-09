import mongoose from 'mongoose';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_DEV_CONN_STR: string;
      DB_PROD_CONN_STR: string;
      SESSION_SECRET: string | string[];
    }
  }
  namespace Express {
    interface Request {
      session: {
        user: {
          username: string,
          id: mongoose.Types.ObjectId
        }
      }
    }
  }
}

export type NextError = (err?: { status: number, message: string }) => void;

export {};
