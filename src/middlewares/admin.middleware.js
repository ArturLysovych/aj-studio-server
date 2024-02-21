import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET;

export const adminMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'A token is required for access' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;

        if (decoded.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Only admin can access this resource' });
        }

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};