import pkg from 'mongoose';
const { Schema, model } = pkg;
import { UserDocument, UserInterface } from './interfaces/User';

const UserSchema = new Schema<UserInterface>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    loginType: { type: String, required: false },
    recipesList: Array,
    userCategories: Array,
  },
  { strict: false }
);

const UserModel = model<UserDocument>('User', UserSchema);
export default UserModel;
