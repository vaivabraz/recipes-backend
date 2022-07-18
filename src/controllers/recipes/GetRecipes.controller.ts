import { Request, Response } from 'express';
import { RecipeModel } from '../../models';

export const getMyRecipes = async (req: Request, res: Response) => {
  try {
    const userRecipes = await RecipeModel.where('author')
      .equals(req.body.payload.username)
      .sort({ _id: -1 })
      .limit(20);

    res.send(userRecipes);
  } catch (e) {
    // console.log(e);
  }
};
