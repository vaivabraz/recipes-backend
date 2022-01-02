import express from 'express';
import {
  createNewRecipe,
  getRecipeBySlug,
  getUserRecipes,
} from '../controllers/recipes';

import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.use('/recipes', isAuth);
router.route('/userRecipes').get(getUserRecipes);
router.route('/recipes/createNew').post(createNewRecipe);
router.route('/recipes/:slug').get(getRecipeBySlug);

export default router;
