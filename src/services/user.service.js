import User from "../schemas/user.schema.js";
import { ProductService } from "./product.service.js";
import moment from 'moment';

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
            const user = await this.getUserById(userId);
    
            if (!user) {
                throw new Error("User not found");
            }
    
            const isLiked = user.likes.includes(productId);
    
            if (isLiked) user.likes = user.likes.filter(like => like !== productId);
            else user.likes.push(productId);
    
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
            return likes;
        } catch (error) {
            throw error;
        }
    }

    async getNewUserCountLastWeek() {
        try {
            const today = moment();
            const startOfThisWeek = today.clone().subtract('week').startOf('isoWeek').toDate();
            const endOfLastWeek = today.clone().subtract('week').endOf('isoWeek').toDate();
    
            const newUserCount = await User.countDocuments({
                createdAt: {
                    $gte: startOfThisWeek,
                    $lte: endOfLastWeek
                }
            });
    
            return { newUserCount, totalUsers: await User.countDocuments() };
        } catch (error) {
            throw error;
        }
    }
    
}