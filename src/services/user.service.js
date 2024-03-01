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
    
    async addToViewed(userId, productId) {
        try {
            const user = await this.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
    
            const productExists = await productService.getProductById(productId);
            if (!productExists) {
                throw new Error('Product not found');
            }
    
            if (!user.viewed.includes(productId)) {
                user.viewed.push(productId);
                await user.save();
                return { message: "Product added to viewed successfully" };
            } else {
                return { message: "Product already exists in viewed list" };
            }
        } catch (error) {
            throw new Error(`Error adding product to viewed: ${error.message}`);
        }
    }
    
    async getViewedProductsByUserId(userId) {
        try {
            const user = await this.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            
            const viewedProducts = await Promise.all(user.viewed.map(productId => productService.getProductById(productId)));
            
            return viewedProducts;
        } catch (error) {
            throw new Error(`Error getting viewed products: ${error.message}`);
        }
    }
    
}