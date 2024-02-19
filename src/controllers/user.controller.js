import { UserService } from "../services/user.service.js";
const userService = new UserService();

export class UserController {
    async getUsers(req, res) {
        try {
            const users = await userService.getUsers();
			return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.userId;
            const user = await userService.getUserById(userId);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async toggleLike(req, res) {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;

            const user = await userService.toggleLike(userId, productId);
            
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getLikesByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const likes = await userService.getLikesByUserId(userId);
            return res.status(200).json(likes);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getNewUserCountLastWeek(req, res) {
        try {
            const newUserCount = await userService.getNewUserCountLastWeek();
            return res.json({ newUserCount });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } 
}