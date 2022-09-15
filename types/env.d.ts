import mongoose, { Types } from 'mongoose';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_DEV_CONN_STR: string;
      DB_PROD_CONN_STR: string;
      SESSION_SECRET: string | string[];
    }
  }
}
