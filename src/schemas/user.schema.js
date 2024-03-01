import { Schema, model } from "mongoose"

export const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    likes: { type: [String], default: [] },
    viewed: { type: [String], default: [] },
    createdAt: { type: Date, default: () => new Date().toISOString() },
    role: { type: String, default: 'USER' }
});

const User = model('User', userSchema);

export default User;