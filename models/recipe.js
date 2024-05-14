import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
    title: { type: String, required: true },
    ingredients: [{
        name: { type: String, required: true },
        amount: { type: String, required: true }
    }],
    prepTime: { type: String, required: true },
    instructions: { type: String, required: true },
    dietaryPreferences: [{ type: Schema.Types.ObjectId, ref: 'Diet' }],
    allergies: [{ type: Schema.Types.ObjectId, ref: 'Allergy' }]
});

export const Recipe = model('Recipe', recipeSchema);