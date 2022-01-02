import { Request, Response } from 'express';
import { RecipeModel } from '../../models';

export const getUserRecipes = async (req: Request, res: Response) => {
  try {
    const userRecipes = await RecipeModel.where('author').equals(
      req.body.payload.username
    );

    res.send(userRecipes);
  } catch (e) {
    // console.log(e);
  }
};
