import { Allergy } from "../models/allergy.js";

export  const addAllergy = async(req, res) => {
    try {
        const { name } = req.body;
        const newAllergy = new Allergy({ name });
        await newAllergy.save();
        res.status(201).json(newAllergy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllergies = async(req, res) =>{
    try {
        const allergies = await Allergy.find();
        res.status(200).json(allergies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}