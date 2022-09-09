import mongoose from 'mongoose';

declare module 'express-session' {
  interface SessionData {
      user: {
        username: string;
        id: mongoose.Types.ObjectId;
      }
  }
}