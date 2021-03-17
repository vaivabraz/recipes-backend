import { Request, Response } from 'express';
import pkg from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { createAccessToken } from '../utils/auth';
const { verify } = pkg;

export const refreshSession = async (req: Request, res: Response) => {
  const token = req.cookies.vbck;
  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }
  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (e) {
    console.log('error:', e);
    return res.send({ ok: false, accessToken: '' });
  }

  const query = {
    username: payload.username,
  };
  const user = await UserModel.findOne(query);
  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }
  return res.send({ ok: true, accessToken: createAccessToken(user) });
};
