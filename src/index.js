import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";

import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import authRoutes from './routes/auth.routes.js';
import orderRoutes from './routes/order.routes.js';
import adminRoutes from './routes/admin.routes.js'

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/uploads', uploadRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes)

app.use(upload.single('image'));

const bootstrap = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);

        mongoose.connection.on('connected', () => { console.log('Connected to MongoDB') });
        mongoose.connection.on('error', (error) => { console.error('Error connecting to MongoDB:', error.message) });
        mongoose.connection.on('disconnected', () => { console.log('Disconnected from MongoDB') });
        
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};
  
bootstrap();
