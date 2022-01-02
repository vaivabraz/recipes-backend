import pkg from 'mongoose';
import { IngredientsSchema } from './IngredientsSchema';
import { PreparationStepsSchema } from './PreparationStepsSchema';
import { PreparationTimeSchema } from './PreparationTimeSchema';
const { Schema, model } = pkg;
import { RecipeDocument, RecipeInterface } from './RecipeInterface';

const RecipeSchema = new Schema<RecipeInterface>(
  {
    //user defined
    title: { type: String, required: true },
    ingredients: IngredientsSchema,
    preparation: PreparationStepsSchema,
    portions: { type: Number },
    time: PreparationTimeSchema,
    image: { type: String },
    categories: [String],
    notes: { type: String },
    summary: { type: String },
    link: { type: String },
    private: { type: Boolean },

    // backend defined
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    author: { type: String, required: true, index: true },
    slug: { type: String, required: true },
    // recipeId: { type: Number },
  }
  //   { strict: false }
);

// RecipeSchema.index({ name: 1 });

export const RecipeModel = model<RecipeDocument>('Recipe', RecipeSchema);
