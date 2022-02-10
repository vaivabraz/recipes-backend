import { Request, Response } from 'express';
import { RecipeModel } from '../../models';
import { RecipeDocument } from '../../models/Recipe/RecipeInterface';
import { AuthorizedReqBody } from '../../middleware/isAuth';

interface RequestBody extends AuthorizedReqBody {
  recipe: RecipeDocument;
}

export const editRecipe = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
) => {
  try {
    if (req.body.payload.username !== req.body.recipe.author) {
      res.status(403).json({ errorMessage: 'Not the author' });
    }

    var query = {
      slug: req.body.recipe.slug,
      author: req.body.payload.username,
    };

    const callbackFunction = (err: any, doc: RecipeDocument) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      return res.send({
        updatedRecipe: doc,
      });
    };
    await RecipeModel.findOneAndUpdate(
      query,
      req.body.recipe,
      { new: true },
      callbackFunction
    );
  } catch (e) {
    res.status(400).json({ errorMessage: e });
  }
};
