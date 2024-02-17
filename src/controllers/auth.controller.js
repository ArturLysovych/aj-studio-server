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

            const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '24h' });
        
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };
}
