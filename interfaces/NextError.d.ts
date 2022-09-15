import { NextFunction } from 'express';

export interface NextError extends NextFunction {
  (err?: { status: number; message: string }): void;
}
