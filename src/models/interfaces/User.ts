import { Document, Model, model, Types, Schema, Query } from 'mongoose';

export interface UserInterface {
  username: string;
  password: string;
  loginType: string; //TODO: sukonkretinti kokie galimi
  recipesList: []; //TODO: sukonkretinti
  userCategories: []; //TODO: sukontretinti
}

interface UserBaseDocument extends UserInterface, Document {
  //galima prideti dalyku, kas nera duombazeje
}

export interface UserDocument extends UserBaseDocument {}
