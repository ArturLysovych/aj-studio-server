import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = 3000;
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use('/users', userRoutes);

const bootstrap = () => {
    try {
        mongoose.connect(process.env.DB_URL);
      
        mongoose.connection.on('connected', () => { console.log('Connected to MongoDB') });
        mongoose.connection.on('error', (error) => { console.error('Error connecting to MongoDB:', error.message) });
        mongoose.connection.on('disconnected', () => { console.log('Disconnected from MongoDB') });
        
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};
  
bootstrap();
