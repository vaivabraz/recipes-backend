import { Request, Response } from 'express';
import { RecipeModel } from '../../models';

export const getRecipeBySlug = async (req: Request, res: Response) => {
  try {
    const recipe = await RecipeModel.where('slug').equals(req.params.slug);
    res.send(recipe);
  } catch (e) {
    // console.log(e);
  }
};
