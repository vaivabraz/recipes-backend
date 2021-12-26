import pkg from 'mongoose';
const { Schema } = pkg;

export type PreparationStepsInRecipeType = {
  groupPreparationSteps: Boolean;
  stepsGroups: StepsGroupsType[];
  stepsList: StepsListItemType[];
};

type StepsGroupsType = {
  groupName: string;
  index: number;
};

type StepsListItemType = {
  step: string;
  groupIndex: number;
};

const StepsGroup = new Schema<StepsGroupsType>({
  groupName: { type: String, required: true },
  index: { type: Number, required: true },
});

const Step = new Schema<StepsListItemType>({
  step: { type: String, required: true },
  groupIndex: { type: Number },
});

export const PreparationStepsSchema = new Schema<PreparationStepsInRecipeType>({
  groupPreparationSteps: { type: Boolean, default: false },
  stepsGroups: [StepsGroup],
  stepsList: [Step],
});
