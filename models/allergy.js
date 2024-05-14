import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const allergySchema = new Schema({
  name: String
});

export const Allergy = model('Allergy', allergySchema);
