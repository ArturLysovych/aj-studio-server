import { Schema, model } from "mongoose"

export const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = model('User', userSchema);

export default User;