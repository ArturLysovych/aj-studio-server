import User from "../schemas/user.schema.js";
import { ProductService } from "./product.service.js";
import moment from 'moment';
import nodemailer from 'nodemailer';
import { v1 as uuidv1 } from 'uuid';

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
    
    async getLikedProductsByUserId(userId) {
        try {
            const user = await this.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            
            const likedProducts = await Promise.all(user.likes.map(productId => productService.getProductById(productId)));
            
            return likedProducts;
        } catch (error) {
            throw new Error(`Error getting liked products: ${error.message}`);
        }
    }

    async bindEmailToUser(userId, email) {
        try {
            const user = await this.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const existingUserWithEmail = await User.findOne({ email });
            if (existingUserWithEmail) {
                throw new Error('Email is already linked to another user');
            }

            const confirmationCode = uuidv1();

            user.email = '';
            user.unconfirmedEmail = email;
            user.confirmationCode = confirmationCode;

            console.log(user)
            await user.save();

            await this.sendConfirmationEmail(userId, email, confirmationCode);

            return { message: "Confirmation email sent." };
        } catch (error) {
            throw new Error(`Error binding email to user: ${error.message}`);
        }
    }

    
    async sendConfirmationEmail(userId, email, confirmationCode) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_TOKEN
                }
            });

            const mailOptions = {
                from: 'PJ STUDIO',
                to: email,
                subject: 'Email Confirmation',
                html: `
                <p>Click to the button to link mail, if it's not you, ignore it.</p>
                <a href="http://localhost:3000/profile/confirm-email?userId=${userId}&email=${email}&confirmationCode=${confirmationCode}">
                    <button type="submit">Confirm Email</button>
                </form>`
            };

            await transporter.sendMail(mailOptions);

            console.log('Confirmation email sent');
        } catch (error) {
            throw new Error(`Error sending confirmation email: ${error.message}`);
        }
    }

    async confirmEmail(userId, email, confirmationCode) {
        try {
            const user = await this.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            if (user.confirmationCode !== confirmationCode) {
                throw new Error('Invalid confirmation code');
            }

            user.email = user.unconfirmedEmail;
            user.unconfirmedEmail = undefined;
            user.confirmationCode = undefined;

            await user.save();

            return { message: "Succesfully confirmed." };
        } catch (error) {
            throw new Error(`Error confirming email: ${error.message}`);
        }
    }
}