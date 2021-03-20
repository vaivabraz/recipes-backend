import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import pkg from 'bcryptjs';
const { hash } = pkg;

interface RegisterUserReqBody {
  email: string;
  password: string;
  loginType: string;
}

interface RegisterUserResBody {
  username: string;
}

export const registerUser = async (
  req: Request<{}, {}, RegisterUserReqBody>,
  res: Response<RegisterUserResBody>
) => {
  try {
    const userWithSameEmail = await UserModel.findOne({
      email: req.body.email,
    });
    if (userWithSameEmail) {
      throw {
        errorMessage: 'User with the same email already exists',
        errorCode: 'EMAIL_ALREADY_USED',
      };
    }

    let username = req.body.email.split('@')[0];
    const userWithSameUsername = await UserModel.findOne({
      username: username,
    });
    if (userWithSameUsername) {
      username = req.body.email;
    }

    const hashedPass = await hash(req.body.password, 12);
    const fullUser = { ...req.body, password: hashedPass, username };
    const newUser = new UserModel(fullUser);
    const saveResponse = await newUser.save();
    res.status(201).json({
      username: saveResponse.username,
    });
  } catch (e) {
    if (typeof e === 'string') {
      e = { errorMessage: e };
    }
    res.status(400).json(e);
  }
};
