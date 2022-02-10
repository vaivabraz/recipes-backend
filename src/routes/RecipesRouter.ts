import express from 'express';
import {
  createNewRecipe,
  getRecipeBySlug,
  getMyRecipes,
  editRecipe,
  deleteRecipe,
} from '../controllers/recipes';

import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.use('/recipes', isAuth);
router.route('/recipes/getMyRecipes').get(getMyRecipes);
router.route('/recipes/createNew').post(createNewRecipe);
router.route('/recipes/getRecipe').get(getRecipeBySlug);
router.route('/recipes/edit').post(editRecipe);
router.route('/recipes/delete').post(deleteRecipe);

export default router;
