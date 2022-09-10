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

export type NextError = (err?: { status: number, message: string }) => void;

export interface passedAdData {
  title: string;
  description: string;
  price: string;
  location: string;
}

export {};
