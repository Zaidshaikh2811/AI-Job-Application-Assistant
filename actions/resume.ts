"use server";

import Resume from "@/lib/models/Resume";
import dbConnect from "@/lib/mongodb";
import { isValidObjectId } from "mongoose";

export const getIndividualResume = async (id: string) => {
    await dbConnect();

    if (!isValidObjectId(id)) {
        throw new Error("Invalid Resume ID");
    }

    const resume = await Resume.findById(id).lean();

    if (!resume) {
        throw new Error("Resume not found");
    }

    return resume;
};
