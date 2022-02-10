import { Request, Response } from 'express';
import { RecipeModel } from '../../models';

export const getRecipeBySlug = async (
  req: Request<{}, {}, { recipeSlug: string }>,
  res: Response
) => {
  try {
    if (!req?.body?.recipeSlug) {
      res.status(400).json({ errorMessage: 'Recipe slug was not provided' });
    }
    const recipe = await RecipeModel.where('slug')
      .equals(req.body.recipeSlug)
      .limit(1);
    res.send(recipe[0]);
  } catch (e) {
    res.status(400).json({ errorMessage: e });
  }
};
