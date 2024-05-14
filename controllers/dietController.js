import { Diet } from "../models/diet.js";

export const addDietaryPreference = async(req, res) => {
    try {
        const { name } = req.body;
        const newPreference = new Diet({ name });
        await newPreference.save();
        res.status(201).json(newPreference);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const getDietaryPreferences = async(req, res) => {
    try {
        const preferences = await Diet.find();
        res.status(200).json(preferences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}