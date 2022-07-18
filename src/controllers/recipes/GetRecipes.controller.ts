import { Request, Response } from 'express';
import { RecipeModel } from '../../models';

export const getMyRecipes = async (req: Request, res: Response) => {
  try {
    if (req.query.categories){
      const userRecipes = await RecipeModel
      .where('author')
      .equals(req.body.payload.username)
      .where('categories.id').equals(req.query.categories)
      .sort({ _id: -1 })
      .limit(20);

    return res.send(userRecipes);
    }
    const userRecipes = await RecipeModel
      .where('author')
      .equals(req.body.payload.username)
      .sort({ _id: -1 })
      .limit(20);

    res.send(userRecipes);
  } catch (e) {
    // console.log(e);
  }
};
