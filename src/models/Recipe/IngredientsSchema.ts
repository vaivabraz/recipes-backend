import pkg from 'mongoose';
const { Schema } = pkg;

export type IngredientsInRecipeType = {
  groupIngredients: Boolean;
  ingredientsGroups: IngredientsGroupsType[];
  ingredientsList: IngredientsListItemType[];
};

type IngredientsListItemType = {
  product: string;
  quantity: string;
  id: number;
  groupIndex: number;
};

type IngredientsGroupsType = {
  groupName: string;
  index: number;
};

const IngredientsGroup = new Schema<IngredientsGroupsType>({
  groupName: { type: String, required: true },
  index: { type: Number, required: true },
});

const IngredientsItem = new Schema<IngredientsGroupsType>({
  product: { type: String, required: true },
  quantity: { type: String },
  id: { type: Number, required: true },
  groupIndex: { type: Number },
});

export const IngredientsSchema = new Schema<IngredientsInRecipeType>({
  groupIngredients: { type: Boolean, default: false },
  ingredientsGroups: [IngredientsGroup],
  ingredientsList: [IngredientsItem],
});
