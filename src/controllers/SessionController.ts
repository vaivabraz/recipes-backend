import { Request, Response } from 'express';
import pkg from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { createAccessToken } from '../utils/createToken';
const { verify } = pkg;

export const refreshSession = async (req: Request, res: Response) => {
  const handleFailedResponse = (res: Response) => {
    //TODO: ar reikia cia pakeisti status code??
    res.send({ accessToken: '' });
  };

  const token = req.cookies.vbck;
  if (!token) {
    return handleFailedResponse(res);
  }
  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (e) {
    return handleFailedResponse(res);
  }

  const user = await UserModel.findOne({
    username: payload.username,
  });
  if (!user) {
    return handleFailedResponse(res);
  }
  if (user.tokenVersion !== payload.tokenVersion) {
    return handleFailedResponse(res);
  }

  return res.send({ accessToken: createAccessToken(user) });
};

interface RevokeRefreshTokenForUserReqBody {
  username: string;
}
interface RevokeRefreshTokenForUserResBody {
  errorMessage?: string;
}

export const revokeRefreshTokenForUser = async (
  req: Request<{}, {}, RevokeRefreshTokenForUserReqBody>,
  res: Response<RevokeRefreshTokenForUserResBody>
) => {
  try {
    const query = {
      username: req.body.username,
    };

    await UserModel.findOneAndUpdate(query, {
      $inc: { tokenVersion: 1 },
    });

    res.send();
  } catch (e) {
    res.status(400).json({ errorMessage: e });
  }
};
