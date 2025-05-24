"use server"

import User from "@/lib/models/User";
import UserProfile from "@/lib/models/profile";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface LoginResponse {
    success: boolean;
    error?: string;
    data?: { token: string };
}

interface SignupResponse {
    success: boolean;
    error?: string;
    data?: unknown;
}


interface OtpValidationResponse {
    success: boolean;
    error?: string;
}

export async function validateOtp(email: string, otp: string): Promise<OtpValidationResponse> {
    try {
        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        if (user.isActive) {
            return { success: false, error: "User already verified" };
        }

        if (user.otp !== otp) {
            return { success: false, error: "Invalid OTP" };
        }

        if (!user.otpExpires || user.otpExpires < new Date()) {
            return { success: false, error: "OTP expired" };
        }

        user.isActive = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const existingProfile = await UserProfile.findOne({ userId: user._id });
        if (!existingProfile) {
            await UserProfile.create({
                userId: user._id,
                fullName: user.name,
                email: user.email,
            });
        }
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}


// Dummy email sender stub (replace with real email service)
async function sendOtpEmail(email: string, otp: string) {
    console.log(`Sending OTP ${otp} to email: ${email}`);
    // Use your email provider SDK here (e.g., nodemailer, SendGrid, etc.)
}


export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
        await dbConnect();
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, error: "User not found" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, error: "Invalid password" };
        }

        // Create JWT token (replace `your_jwt_secret` with your env var)
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            // { userId: "64eaf6bfa3e2b90c2b9b12a1", email: "janedoe@example.com" },
            process.env.JWT_SECRET || "your_jwt_secret",
            { expiresIn: "7d" }
        );
        const cookieStore = await cookies();

        cookieStore.set({
            name: 'token',
            value: token,

            maxAge: 7 * 24 * 60 * 60,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        return { success: true, data: { token } };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function signupWithOtp(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
): Promise<SignupResponse> {
    try {
        if (password !== confirmPassword) {
            return { success: false, error: "Passwords do not match" };
        }

        await dbConnect();
        const existingUser = await User.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 12);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        if (existingUser) {
            if (existingUser.isActive) {
                return { success: false, error: "Email already registered and verified" };
            }

            // Update OTP and password for unverified user
            existingUser.name = name;
            existingUser.password = hashedPassword;
            existingUser.otp = otp;
            existingUser.otpExpires = otpExpiry;
            await existingUser.save();

            await sendOtpEmail(email, otp);
            console.log("OTP re-sent to email:", email);
            return { success: true, data: { email } };
        }

        // New user creation
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires: otpExpiry,
            isActive: false,
        });

        await newUser.save();

        await sendOtpEmail(email, otp);
        console.log("OTP sent to email:", email);
        return { success: true, data: { email } };

    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}
