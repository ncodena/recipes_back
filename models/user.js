import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
//   age: Number,
//   weight: Number,
//   height: Number,
  dietaryPreferences: [{ type: Schema.Types.ObjectId, ref: 'Diet' }],
  allergies: [{ type: Schema.Types.ObjectId, ref: 'Allergy' }]
});

export const User = model('User', userSchema);