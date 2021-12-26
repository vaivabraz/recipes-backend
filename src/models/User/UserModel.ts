import pkg from 'mongoose';
const { Schema, model } = pkg;
import { UserDocument, UserInterface } from './UserInterface';

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
    userCategories: { type: Array, default: initialCategories },
    tokenVersion: { type: Number, default: 0 },
  },
  { strict: false }
);

// UserSchema.virtual creates a virtual field that does not exist in the database, but is derivative

export const UserModel = model<UserDocument>('User', UserSchema);
