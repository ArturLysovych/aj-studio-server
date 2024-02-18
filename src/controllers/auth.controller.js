import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../schemas/user.schema.js';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(401).json({ message: 'Incorrect username or password' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect username or password' });
            }

            const { _id, username: UserName, password: UserPassword, __v } = user;
            const tokenUser = { _id, username: UserName, password: UserPassword, __v };
            
            const token = jwt.sign({ user: tokenUser }, secretKey, { expiresIn: '24h' });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };

    async register(req, res) {
        try {
            const { username, password } = req.body;

            const findedUser = await User.findOne({ username });
            if (findedUser) {
                return res.status(400).json({ message: 'This username is already in use' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ username, password: hashedPassword });
            await user.save();

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
