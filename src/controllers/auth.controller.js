import jwt from 'jsonwebtoken';
import User from '../schemas/user.schema.js';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export class AuthController {
    async login (req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
        
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'False data' });
            }

            const token = jwt.sign({ user: user }, secretKey, { expiresIn: '24h' });
        
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };

    async register(req, res) {
        try {
            const findedUser = await User.findOne({ username: req.body.username });
            if (findedUser) {
                return res.status(400).json({ message: 'This username is already in use' });
            }
    
            const user = new User(req.body);
            await user.save();
    
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
}
