"use server";

import Resume from "@/lib/models/Resume";
import dbConnect from "@/lib/mongodb";
import { isValidObjectId } from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ResumeCheckResult from "@/lib/models/ResumeCheckResult";

export const getIndividualResume = async (id: string) => {
    try {
        await dbConnect();

        if (!isValidObjectId(id)) {
            return {
                success: false,
                message: "Invalid Resume ID format"
            };
        }

        const resume = await Resume.findById(id).lean();

        if (!resume) {
            return {
                success: false,
                message: "Resume not found or you don't have permission to access it"
            };
        }

        return {
            success: true,
            message: "Resume fetched successfully",
            data: JSON.parse(JSON.stringify(resume))
        };
    } catch (err) {
        console.error("Error fetching resume:", err);
        return {
            success: false,
            message: err instanceof Error ? err.message : "Failed to fetch resume"
        };
    }
};

export const saveResume = async (
    resumeData: any,
    id: string,
    template: string,
    atsScore: number,
    metadata: any
) => {
    try {
        await dbConnect();


        // Validate required fields
        if (!resumeData || !id || !template) {
            return {
                success: false,
                message: "Missing required fields: resumeData, userId, or template"
            };
        }

        // Validate ATS score
        if (typeof atsScore !== 'number' || atsScore < 0 || atsScore > 100) {
            return {
                success: false,
                message: "ATS Score must be a number between 0 and 100"
            };
        }

        const resumeToSave = {
            ...resumeData,
            userId: id,
            template: template,
            atsScore: atsScore,
            metaData: metadata,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const savedResume = await Resume.create(JSON.parse(JSON.stringify(resumeToSave)));

        return {
            success: true,
            message: `Resume saved successfully with ${atsScore}% ATS score`,
            data: JSON.parse(JSON.stringify(savedResume))
        };
    } catch (err) {
        console.error("Error saving resume:", err);

        // Handle specific MongoDB errors
        if (err instanceof Error) {
            if (err.message.includes('duplicate key')) {
                return {
                    success: false,
                    message: "A resume with similar details already exists"
                };
            }
            if (err.message.includes('validation')) {
                return {
                    success: false,
                    message: "Resume data validation failed. Please check all required fields."
                };
            }
        }

        return {
            success: false,
            message: "Failed to save resume. Please try again."
        };
    }
};

export const getReumses = async () => {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return {
                success: false,
                message: "Authentication required. Please log in again."
            };
        }

        let decodedToken;
        try {
            decodedToken = jwt.decode(token) as any;
        } catch {
            return {
                success: false,
                message: "Invalid authentication token. Please log in again."
            };
        }

        if (!decodedToken?.userId) {
            return {
                success: false,
                message: "Invalid user session. Please log in again."
            };
        }

        const resumes = await Resume.find({ userId: decodedToken.userId })
            .sort({ updatedAt: -1 }) // Sort by most recently updated
            .lean();

        if (!resumes || resumes.length === 0) {
            return {
                success: true,
                message: "No resumes found. Create your first resume to get started!",
                data: []
            };
        }

        return {
            success: true,
            message: `Successfully loaded ${resumes.length} resume${resumes.length !== 1 ? 's' : ''}`,
            data: JSON.parse(JSON.stringify(resumes))
        };
    } catch (err: unknown) {
        console.error("Error fetching resumes:", err);

        // Handle specific database connection errors
        if (err instanceof Error) {
            if (err.message.includes('ECONNREFUSED') || err.message.includes('connection')) {
                return {
                    success: false,
                    message: "Database connection failed. Please try again later."
                };
            }
            if (err.message.includes('timeout')) {
                return {
                    success: false,
                    message: "Request timeout. Please check your connection and try again."
                };
            }
        }

        return {
            success: false,
            message: "Failed to fetch resumes. Please refresh the page and try again."
        };
    }
};

// Additional helper function for updating resume
export const updateResume = async (id: string, updateData: Partial<any>) => {
    try {
        await dbConnect();

        if (!isValidObjectId(id)) {
            return {
                success: false,
                message: "Invalid Resume ID format"
            };
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return {
                success: false,
                message: "Authentication required"
            };
        }

        const decodedToken = jwt.decode(token) as any;
        if (!decodedToken?.userId) {
            return {
                success: false,
                message: "Invalid user session"
            };
        }

        const updatedResume = await Resume.findOneAndUpdate(
            { _id: id, userId: decodedToken.userId }, // Ensure user owns the resume
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedResume) {
            return {
                success: false,
                message: "Resume not found or you don't have permission to update it"
            };
        }

        return {
            success: true,
            message: "Resume updated successfully",
            data: JSON.parse(JSON.stringify(updatedResume))
        };
    } catch (err) {
        console.error("Error updating resume:", err);
        return {
            success: false,
            message: err instanceof Error ? err.message : "Failed to update resume"
        };
    }
};

// Helper function for deleting resume
export const deleteResume = async (id: string) => {
    try {
        await dbConnect();

        if (!isValidObjectId(id)) {
            return {
                success: false,
                message: "Invalid Resume ID format"
            };
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return {
                success: false,
                message: "Authentication required"
            };
        }

        const decodedToken = jwt.decode(token) as any;
        if (!decodedToken?.userId) {
            return {
                success: false,
                message: "Invalid user session"
            };
        }

        const deletedResume = await Resume.findOneAndDelete({
            _id: id,
            userId: decodedToken.userId
        }).lean();

        if (!deletedResume) {
            return {
                success: false,
                message: "Resume not found or you don't have permission to delete it"
            };
        }

        return {
            success: true,
            message: "Resume deleted successfully",
            data: JSON.parse(JSON.stringify(deletedResume))
        };
    } catch (err) {
        console.error("Error deleting resume:", err);
        return {
            success: false,
            message: err instanceof Error ? err.message : "Failed to delete resume"
        };
    }
};


interface ResumeCheckData {
    jobTitle: string;
    company: string;
    jobUrl: string;
    fitRatio: number;
    keywordMatch: {
        matched?: string[];
        missing?: string[];
    };
    suggestions: {
        sections?: Record<string, unknown>;
        general?: string[];
    };
    skillGaps?: string[];
    strengths?: string[];
    resp?: unknown;
}

export const saveResumeCheck = async (data: ResumeCheckData) => {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return {
                success: false,
                message: "Authentication required"
            };
        }

        const decodedToken = jwt.decode(token) as { userId?: string } | null;
        if (!decodedToken?.userId) {
            return {
                success: false,
                message: "Invalid user session"
            };
        }
        console.log("Decoded Token:", data.resp);

        const resumeCheckResult = new ResumeCheckResult({
            userId: decodedToken.userId,
            jobTitle: data.jobTitle,
            company: data.company,
            jobUrl: data.jobUrl,
            fitRatio: data.fitRatio,
            keywordMatch: {
                matched: data.keywordMatch.matched || [],
                missing: data.keywordMatch.missing || []
            },
            suggestions: {
                sections: data.suggestions.sections || {},
                general: data.suggestions.general || []
            },
            skillGaps: data.skillGaps || [],
            strengths: data.strengths || [],
            createdAt: new Date()
        });

        // Save to database
        const savedResult = await resumeCheckResult.save();

        console.log("Resume check result saved:", savedResult._id);

        return {
            id: savedResult._id.toString(),
            success: true,
            message: "Resume analysis saved successfully"
        };
    } catch (err: unknown) {
        console.error("Error saving resume check:", err);
        return {
            success: false,
            message: err instanceof Error ? err.message : "Failed to save resume check"
        };
    }
};



export const getResumeCheckResult = async (id: string) => {
    try{
        await dbConnect();

        if (!isValidObjectId(id)) {
            return {
                success: false,
                message: "Invalid Resume Check ID format"
            };
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return {
                success: false,
                message: "Authentication required"
            };
        }

        const decodedToken = jwt.decode(token) as { userId?: string } | null;
        if (!decodedToken?.userId) {
            return {
                success: false,
                message: "Invalid user session"
            };
        }

        const result = await ResumeCheckResult.findOne({ _id: id, userId: decodedToken.userId }).lean();

        if (!result) {
            return {
                success: false,
                message: "Resume check result not found or you don't have permission to access it"
            };
        }

        return {
            success: true,
            message: "Resume check result fetched successfully",
            data: JSON.parse(JSON.stringify(result))
        };

    }
    catch (error) {
        console.error("Error fetching resume check result:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch resume check result"
        };
    }
}