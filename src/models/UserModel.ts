import pkg from 'mongoose';
const { Schema, model } = pkg;
import { UserDocument, UserInterface } from './interfaces/User';

//TODO: should depend on user selected language
const initialCategories = [
  'Desertai',
  'Greiti',
  'Gėrimai',
  'Pietūs',
  'Sriubos',
  'Šalti patiekalai',
  'Šventiniai',
  'Užkandžiai',
  'Vegetariška',
];

const UserSchema = new Schema<UserInterface>(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    loginType: { type: String, required: false },
    recipesList: Array,
    userCategories: { type: Array, default: initialCategories },
    tokenVersion: { type: Number, default: 0 },
  },
  { strict: false }
);

const UserModel = model<UserDocument>('User', UserSchema);
export default UserModel;
