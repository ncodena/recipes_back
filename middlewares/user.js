import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const authMiddleware =  (req, res, next) => {
    const secretToken = process.env.SECRET_TOKEN;
    const authHeader = req.headers.authorization;

    if(!authHeader){
     return res.sendStatus(401)
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, secretToken, async (err, user) => {
     if(err){
          return res.sendStatus(403)
     }

     const data = await User.findById(user.id).populate('dietaryPreferences').populate('allergies');
     req.user = data;
     console.log(req.user)
     next()

    })
}