import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  // console.log(`${req.protocol}:${req.get('host')}  ${req.originalUrl}`);
  next();
};
