import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const dietSchema = new Schema({
  name: String
});
export const Diet = model('Diet', dietSchema);
