import jsonwebtokenPkg from 'jsonwebtoken';
const { sign } = jsonwebtokenPkg;
import { UserDocument } from '../models';

export const createAccessToken = (user: UserDocument) => {
  return sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '60m',
  });
};

export const createRefreshToken = (user: UserDocument) => {
  return sign(
    { username: user.username, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '90d',
    }
  );
};
