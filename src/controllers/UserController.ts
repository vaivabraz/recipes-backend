import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

export const getAllUsers = (req: Request, res: Response) => {
  UserModel.find((err, users) => {
    if (err) {
      return res.send(err);
    }
    return res.send(users);
  });
};

interface ReqBody {
  username: String;
  password: String;
  loginType: String;
}

export const registerUser = async (
  req: Request<{}, {}, ReqBody>,
  res: Response
) => {
  try {
    const newUser = new UserModel(req.body);
    const saveResponse = await newUser.save();
    res.send(saveResponse);
  } catch (e) {
    res.send(e); //TODO: mark error status code
  }
};
