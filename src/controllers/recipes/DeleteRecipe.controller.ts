import { Request, Response } from 'express';
import { RecipeModel } from '../../models';

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    var query = {
      slug: req.body.slug,
      author: req.body.payload.username,
    };

    const callbackFunction = (err: any, doc: any) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      return res.send({
        deletedRecipe: doc,
      });
    };

    await RecipeModel.findOneAndDelete(query, callbackFunction);
  } catch (e) {
    res.status(400).json({ errorMessage: e });
  }
};
