import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import UserProfile from '@/lib/models/profile';

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const body = await req.json(); // ✅ parse request body
        const userProfile = new UserProfile(body);
        await userProfile.save();

        return NextResponse.json(
            { message: 'User profile created successfully', userProfile },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error('Error creating user profile:', error);
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { message: 'Internal server error', error: errorMessage },
            { status: 500 }
        );
    }
}
