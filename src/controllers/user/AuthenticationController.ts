import { Request, Response } from 'express';
import UserModel from '../../models/UserModel';
import { createRefreshToken } from '../../utils/createToken';
import pkg from 'bcryptjs';
const { compare } = pkg;

interface LoginUserReqBody {
  email: string;
  password: string;
  loginType: string;
}

interface LoginUserResBody {
  accessToken: string;
}
export const loginUser = async (
  req: Request<{}, {}, LoginUserReqBody>,
  res: Response<LoginUserResBody>
) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    }).select('+password');

    if (!user) {
      throw { errorMessage: 'User not found', errorCode: 'USER_NOT_FOUND' };
    }
    const valid = await compare(req.body.password, user.password);
    if (!valid) {
      throw {
        errorMessage: 'Password is not valid',
        errorCode: 'INVALID_PASSWORD',
      };
    }

    setCookie(res, createRefreshToken(user));
    res.send();
  } catch (e) {
    if (typeof e === 'string') {
      e = { errorMessage: e };
    }
    res.status(401).json(e);
  }
};

interface LogoutUserResBody {
  accessToken: string;
}
export const logoutUser = async (
  _req: Request,
  res: Response<LogoutUserResBody>
) => {
  try {
    setCookie(res, '');
    res.send({
      accessToken: '',
    });
  } catch (e) {
    if (typeof e === 'string') {
      e = { errorMessage: e };
    }
    res.status(400).json(e);
  }
};

const setCookie = (res: Response, token: string) => {
  res.cookie('vbck', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    // sameSite: 'strict',
    // path: '/refresh_session', TODO: ar reikia sito?
  });
};
