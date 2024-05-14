import { Recipe } from '../models/recipe.js';

export const getRandomRecipe = async(req, res) => {
    try {
        const userAllergies = req.user.allergies; 
        const dietaryPreferences = req.user.dietaryPreferences;

        console.log('alergies', userAllergies, 'dieta', dietaryPreferences);
    
        const validRecipes = await Recipe.aggregate([
          {
            $match: {
                allergies: { $nin: userAllergies },
                dietaryPreferences: { $in: dietaryPreferences }
            }
          },
            // Poblar datos de preferencias dietéticas
          {
            $lookup: {
              from: "diets", 
              localField: "dietaryPreferences",
              foreignField: "_id",
              as: "dietaryPreferenceDetailss"
            }
          },
          // Poblar datos de alergenos
          {
            $lookup: {
              from: "allergies",
              localField: "allergies",
              foreignField: "_id",
              as: "allergenDetails"
            }
          },
          {
            $project: {
                allergies: 0,
                dietaryPreferences: 0,
            }
          },
          { $sample: { size: 1 } },
           
        ]);
    
        if (!validRecipes.length) {
          return res.status(404).send('No recipes found that match the criteria.');
        }
    
        res.json(validRecipes[0]);
      } catch (error) {
        res.status(500).send(error.message);
      }
}


export const getRecipes = async(req, res) => {
    try {
        const userAllergies = req.user.allergies;
        const dietaryPreferences = req.user.dietaryPreferences;
    
        const recipes = await Recipe.find({
          $and: [
            { allergens: { $not: { $in: userAllergies } } },
            { dietaryPreferences: { $in: dietaryPreferences } }
          ]
        }).populate('dietaryPreferences').populate('allergies');
    
        res.json(recipes);
      } catch (error) {
        res.status(500).send(error.message);
      }
}

export const newRecipe = async(req, res) => {
    try {
        const { title, ingredients, instructions, prepTime, dietaryPreferences, allergies } = req.body;

        if (!title || !ingredients || !instructions) {
            return res.status(400).send("Please provide all required fields");
        }

        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            prepTime,
            dietaryPreferences,
            allergies
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

