import User from "../schemas/user.schema.js";
import mongoose from "mongoose";
import { ProductService } from "./product.service.js";

const productService = new ProductService();

export class UserService {
    async getUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async toggleLike(userId, productId) {
        try {
            const product = await productService.getProductById(productId);
    
            const user = await this.getUserById(userId);
            console.log(user)
            if (!user) {
                throw new Error("User not found");
            }
    
            const existingIndex = user.likes.findIndex(like => like._id.toString() === productId);
            if (existingIndex !== -1) user.likes.splice(existingIndex, 1);
            else user.likes.push(product);
    
            const updatedUser = await user.save();
    
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    async getLikesByUserId(userId) {
        try {
            const user = await this.getUserById(userId);
            const likes = user.likes;
            console.log(likes);
            return likes;
        } catch (error) {
            throw error;
        }
    }
}