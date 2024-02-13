import User from "../schemas/user.schema.js";

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

    async createUser(userInfo) {
        try {
            const user = new User(userInfo);

            return await User.create(user);
        } catch (error) {
            throw error;
        }
    }
}