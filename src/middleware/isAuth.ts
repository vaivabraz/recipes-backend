import { RequestHandler, Request } from 'express';
import pkg from 'jsonwebtoken';
const { verify } = pkg;

interface reqBody {
  payload?: string | object;
}

export interface AuthorizedReqBody {
  payload: {
    username: string;
  };
}

export const isAuth: RequestHandler = (
  req: Request<{}, {}, reqBody>,
  res,
  next
) => {
  const token = req.cookies.vbck;
  try {
    if (!token) {
      throw 'not authorized';
    }

    const payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.body.payload = payload;
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }

  return next();
};
