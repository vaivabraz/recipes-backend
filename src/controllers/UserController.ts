import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.send({
      users: users,
    });
  } catch (e) {
    res.status(400).json({ errorMessage: e });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.payload.username,
    });
    res.send({
      user: user,
    });
  } catch (e) {
    return res.status(400).json({
      errorMessage: e,
    });
  }
};
