import { RequestHandler, Request } from 'express';
import pkg from 'jsonwebtoken';
const { verify } = pkg;

interface reqBody {
  payload: string | object;
}

export const isAuth: RequestHandler = (
  req: Request<{}, {}, reqBody>,
  res,
  next
) => {
  const authorization = req.headers['authorization'];
  try {
    if (!authorization) {
      throw 'not authorized';
    }
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.body.payload = payload;
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }

  return next();
};
