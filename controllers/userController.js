import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const secretToken = process.env.SECRET_TOKEN;

const generateToken = (data) => {
    return jwt.sign(data, secretToken, {expiresIn: '1800s'})
}

export const register = async (req, res) => {
    try {
        const { email, password, name, dietaryPreferences, allergies } = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(404).send('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            // age,
            // weight,
            // height,
            dietaryPreferences,
            allergies
        });
        await newUser.save();
        res.status(201).json(
            {success: 'Your account has been created successfully'}
        );
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send(error.message);
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            return res.status(404).send('User does not exist')
        }

        const validPassword = await bcrypt.compare(password, user.password )

        if(!validPassword) {
            return res.status(400).send('Invalid credentials');
        }

        const token = generateToken({email: user.email, id: user._id })

        res.json({token, user});

    } catch(err){
        res.sendStatus(500)
    }
}

export const update = async (req, res) => {
    try {
        const { userId } = req.params;
        const update = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserProfile = async(req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('dietaryPreferences').populate('allergies');;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMe = async (req, res) => {
    console.log(req.user)
    const {id} = req.user;
    try {
        const data = await User.findById(id).populate('dietaryPreferences').populate('allergies');
        if(!data){
            res.sendStatus(404)
        } else {
            res.json(data)
        }
    } catch(err){
        res.sendStatus(500)
    }
}