"use server";

import Resume from "@/lib/models/Resume";
import dbConnect from "@/lib/mongodb";
import { isValidObjectId } from "mongoose";

export const getIndividualResume = async (id: string) => {
    try {

        await dbConnect();

        if (!isValidObjectId(id)) {
            throw new Error("Invalid Resume ID");
        }

        const resume = await Resume.findById(id).lean();

        if (!resume) {
            throw new Error("Resume not found");
        }

        return { success: true, message: "Resume fetched successfully", data: JSON.parse(JSON.stringify(resume)) };
    } catch (err) {
        console.error("Error fetching resume:", err);
        return { success: false, message: err instanceof Error ? err.message : "Failed to fetch resume" };
    }
};


export const saveResume = async (resumeData: any) => {
    try {
        await dbConnect();

        const resp = await Resume.create(JSON.parse(JSON.stringify(resumeData)));


        return { success: true, message: "Resume saved successfully", data: JSON.parse(JSON.stringify(resp)) };
    } catch (err) {
        console.log(err);
        return { success: false, message: "Failed to save resume" };
    }
};




