import { Document } from 'mongoose';

export interface UserInterface {
  email: string;
  username: string;
  password: string;
  loginType: string; //TODO: sukonkretinti kokie galimi
  recipesList: []; //TODO: sukonkretinti
  userCategories: string[];
  tokenVersion: number;
}

interface UserBaseDocument extends UserInterface, Document {
  //galima prideti dalyku, kas nera duombazeje
}

export interface UserDocument extends UserBaseDocument {}
