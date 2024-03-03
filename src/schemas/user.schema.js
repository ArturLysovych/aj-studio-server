import { Schema, model } from "mongoose"

export const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    likes: { type: [String], default: [] },
    unconfirmedEmail: { type: String, required: false },
    confirmationCode: { type: String, required: false },
    viewed: { type: [String], default: [] },
    createdAt: { type: Date, default: () => new Date().toISOString() },
    role: { type: String, default: 'USER' }
});

const User = model('User', userSchema);

export default User;