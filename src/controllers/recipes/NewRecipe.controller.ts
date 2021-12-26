import { Request, Response } from 'express';
import {
  RecipeInterface,
  UserDefinedRecipeInfo,
} from '../../models/Recipe/RecipeInterface';
import { RecipeModel } from '../../models';
import { AuthorizedReqBody } from '../../middleware/isAuth';

interface RequestBody extends UserDefinedRecipeInfo, AuthorizedReqBody {}

export const createNewRecipe = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
) => {
  try {
    const dataStamp = Date.now();
    const slug =
      req.body.title.replace(/\s+/g, '-').toLowerCase() + '-' + dataStamp;

    const newRecipe: RecipeInterface = {
      ...req.body,
      slug: slug,
      author: req.body.payload.username,
    };
    //TODO: more specific recipe id?
    const recipe = new RecipeModel(newRecipe);
    await recipe.save((err) => {
      if (err) return res.status(400).send(err);
      console.log('item saved');
    });

    return res.status(201).json(recipe);
  } catch (e) {
    console.log(e);
  }
};
