import { Schema, model, models } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string; // hashed password
    isActive: boolean; // whether user is activated (OTP verified)
    otp?: string;
    otpExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: false },
        otp: { type: String },
        otpExpires: { type: Date },
    },
    { timestamps: true }
);

// Use existing model if already compiled (important in Next.js hot reload environment)
const User = models.User || model<IUser>("User", userSchema);

export default User;
