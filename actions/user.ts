"use server";

import dbConnect from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import UserProfile from "@/lib/models/profile";



interface JwtPayload {
    userId: string;
    [key: string]: unknown;
}

interface BaseResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

interface UpdateProfileInput {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedIn?: string;
    portfolio?: string;
}

interface WorkExperienceInput {
    jobTitle: string;
    companyName: string;
    location: string;
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    responsibilities?: string;
    technologies?: string[];
}

interface EducationInput {
    degree: string;
    institution: string;
    fieldOfStudy: string;
    location?: string;
    startDate: string;
    endDate?: string;
    currentlyStudying: boolean;
    grade?: string;
    description?: string;
    honors?: string;
}

interface CertificationInput {
    name: string;
    institution: string;
    dateCompleted: string;
    credentialUrl?: string;
}

interface LanguageInput {
    name: string;
    proficiency: 'Basic' | 'Intermediate' | 'Fluent' | 'Native';
}

interface SkillInput {
    name: string;
    level?: string;
}

interface ProjectInput {
    title: string;
    description?: string;
    technologies?: string[];
    githubLink?: string;
    liveLink?: string;
    link?: string; // Generic link field
}

interface AchievementInput {
    title: string;
    description: string;
    date: Date;
}

interface HobbyInput {
    name: string;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Extracts user ID from JWT token in cookies
 */
const getUserIdFromToken = async (): Promise<string> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        throw new Error("Authentication token not found");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        if (!decoded.userId) {
            throw new Error("Invalid token: missing user ID");
        }

        return decoded.userId;
    } catch {
        throw new Error("Invalid or expired token");
    }
};

/**
 * Serializes MongoDB documents for safe JSON transfer
 */
const serializeDocument = <T>(doc: unknown): T => {
    return JSON.parse(JSON.stringify(doc));
};

/**
 * Creates a standardized error response
 */
const createErrorResponse = (error: unknown, defaultMessage: string): BaseResponse => {
    const message = error instanceof Error ? error.message : defaultMessage;
    console.error(`Error: ${message}`, error);
    return { success: false, error: message };
};

/**
 * Creates a standardized success response
 */
const createSuccessResponse = <T>(data?: T, message?: string): BaseResponse<T> => {
    return { success: true, data, message };
};

// ========================================
// BASIC PROFILE OPERATIONS
// ========================================



export const getUserFullData = async (): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const userProfile = await UserProfile.findOne({ userId });

        if (!userProfile) {
            throw new Error("User profile not found");
        }

        return createSuccessResponse(serializeDocument(userProfile));
    } catch {
        return createErrorResponse(undefined, "Failed to fetch user profile");
    }
};
export const getUserProfileData = async (): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const userProfile = await UserProfile.findOne(
            { userId },
            "fullName email phone location linkedIn portfolio"
        );

        if (!userProfile) {
            throw new Error("User profile not found");
        }

        return createSuccessResponse({
            fullName: userProfile.fullName,
            email: userProfile.email,
            phone: userProfile.phone,
            location: userProfile.location,
            linkedIn: userProfile.linkedIn,
            portfolio: userProfile.portfolio,
        });
    } catch {
        return createErrorResponse(undefined, "Failed to fetch user profile");
    }
};

export const updateUserProfileData = async (data: UpdateProfileInput): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const updatedProfile = await UserProfile.findOneAndUpdate(
            { userId },
            { $set: { ...data, updatedAt: new Date() } },
            {
                new: true,
                fields: "fullName email phone location linkedIn portfolio",
                runValidators: true
            }
        );

        if (!updatedProfile) {
            throw new Error("User profile not found");
        }

        return createSuccessResponse(serializeDocument(updatedProfile));
    } catch (error) {
        return createErrorResponse(error, "Failed to update user profile");
    }
};

export const deleteUserProfile = async (): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const deletedProfile = await UserProfile.findOneAndDelete({ userId });

        if (!deletedProfile) {
            throw new Error("User profile not found");
        }

        return createSuccessResponse(null, "User profile deleted successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to delete user profile");
    }
};

// ========================================
// PROFESSIONAL SUMMARY
// ========================================

export const getUserSummary = async (): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const userProfile = await UserProfile.findOne({ userId }, "professionalSummary");

        if (!userProfile) {
            throw new Error("User profile not found");
        }

        return createSuccessResponse(userProfile.professionalSummary);
    } catch (error) {
        return createErrorResponse(error, "Failed to fetch user summary");
    }
};

export const updateUserSummary = async (summary: string): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const updatedProfile = await UserProfile.findOneAndUpdate(
            { userId },
            { $set: { professionalSummary: summary, updatedAt: new Date() } },
            { new: true }
        );

        if (!updatedProfile) {
            throw new Error("User profile not found");
        }

        return createSuccessResponse(null, "Summary updated successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to update summary");
    }
};

// ========================================
// WORK EXPERIENCE OPERATIONS
// ========================================

export const addWorkExperience = async (data: WorkExperienceInput): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const experience = {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.currentlyWorking ? undefined : data.endDate ? new Date(data.endDate) : undefined,
        };

        const updatedProfile = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $push: { workExperience: experience },
                $set: { updatedAt: new Date() }
            },
            { new: true, upsert: true }
        );

        if (!updatedProfile) {
            throw new Error("Failed to add work experience");
        }

        return createSuccessResponse(null, "Work experience added successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to add work experience");
    }
};

export const getWorkExperiences = async (): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const profile = await UserProfile.findOne({ userId }, "workExperience");

        if (!profile) {
            return createSuccessResponse([]);
        }

        const serializedExperiences = profile.workExperience?.map((exp: WorkExperienceInput & { _id: string; startDate?: Date; endDate?: Date; }) => ({
            _id: exp._id.toString(),
            jobTitle: exp.jobTitle,
            companyName: exp.companyName,
            location: exp.location,
            startDate: exp.startDate.toISOString() || null,
            endDate: exp.endDate ? exp.endDate.toISOString() : null,
            currentlyWorking: exp.currentlyWorking,
            responsibilities: exp.responsibilities,
            technologies: exp.technologies
        })) || [];

        return createSuccessResponse(serializedExperiences);
    } catch (error) {
        return createErrorResponse(error, "Failed to fetch work experiences");
    }
};

export const updateWorkExperience = async (
    experienceId: string,
    data: Partial<WorkExperienceInput>
): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const updateData = {
            ...data,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
        };

        const updated = await UserProfile.findOneAndUpdate(
            { userId, "workExperience._id": experienceId },
            {
                $set: {
                    "workExperience.$": { ...updateData, _id: experienceId },
                    updatedAt: new Date()
                }
            },
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new Error("Work experience not found");
        }

        return createSuccessResponse(null, "Work experience updated successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to update work experience");
    }
};

export const deleteWorkExperience = async (experienceId: string): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const updated = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $pull: { workExperience: { _id: experienceId } },
                $set: { updatedAt: new Date() }
            },
            { new: true }
        );

        if (!updated) {
            throw new Error("Work experience not found");
        }

        return createSuccessResponse(null, "Work experience deleted successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to delete work experience");
    }
};

// ========================================
// EDUCATION OPERATIONS
// ========================================

export const addEducation = async (data: EducationInput): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const educationEntry = {
            ...data,
            startDate: new Date(data.startDate),
            endDate: data.currentlyStudying ? undefined : data.endDate ? new Date(data.endDate) : undefined,
        };

        const updatedProfile = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $push: { education: educationEntry },
                $set: { updatedAt: new Date() }
            },
            { new: true, upsert: true }
        );

        if (!updatedProfile) {
            throw new Error("Failed to add education");
        }

        return createSuccessResponse(null, "Education added successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to add education");
    }
};

export const getEducation = async (): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const profile = await UserProfile.findOne({ userId }, "education");

        if (!profile) {
            return createSuccessResponse([]);
        }

        const serializedEducation = profile.education?.map((edu: EducationInput & { _id: string; startDate?: Date; endDate?: Date; }) => ({
            _id: edu._id.toString(),
            institution: edu.institution,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            location: edu.location,
            startDate: edu.startDate?.toISOString() || null,
            endDate: edu.endDate?.toISOString() || null,
            currentlyStudying: edu.currentlyStudying,
            grade: edu.grade,
            description: edu.description,
            honors: edu.honors,
        })) || [];

        return createSuccessResponse(serializedEducation);
    } catch (error) {
        return createErrorResponse(error, "Failed to fetch education");
    }
};

export const updateEducation = async (
    educationId: string,
    data: Partial<EducationInput>
): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const updateFields: Record<string, unknown> = { "updatedAt": new Date() };

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                if (key === 'startDate' || key === 'endDate') {
                    updateFields[`education.$.${key}`] = value ? new Date(value as string) : null;
                } else {
                    updateFields[`education.$.${key}`] = value;
                }
            }
        });

        const updated = await UserProfile.findOneAndUpdate(
            { userId, "education._id": educationId },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new Error("Education entry not found");
        }

        return createSuccessResponse(null, "Education updated successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to update education");
    }
};

export const deleteEducation = async (educationId: string): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const updated = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $pull: { education: { _id: educationId } },
                $set: { updatedAt: new Date() }
            },
            { new: true }
        );

        if (!updated) {
            throw new Error("Education entry not found");
        }

        return createSuccessResponse(null, "Education deleted successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to delete education");
    }
};

// ========================================
// GENERIC CRUD OPERATIONS
// ========================================

/**
 * Generic function to handle CRUD operations for array fields
 */
const createCRUDOperations = <T>(fieldName: string) => {
    const add = async (data: T): Promise<BaseResponse> => {
        try {
            await dbConnect();
            const userId = await getUserIdFromToken();

            const updated = await UserProfile.findOneAndUpdate(
                { userId },
                {
                    $push: { [fieldName]: data },
                    $set: { updatedAt: new Date() }
                },
                { new: true, upsert: true }
            );

            if (!updated) {
                throw new Error(`Failed to add ${fieldName.slice(0, -1)}`);
            }

            const addedItem = updated[fieldName][updated[fieldName].length - 1];
            return createSuccessResponse(serializeDocument(addedItem));
        } catch (error) {
            return createErrorResponse(error, `Failed to add ${fieldName.slice(0, -1)}`);
        }
    };

    const getAll = async (): Promise<BaseResponse> => {
        try {
            await dbConnect();
            const userId = await getUserIdFromToken();

            const profile = await UserProfile.findOne({ userId }).select(fieldName);

            if (!profile) {
                return createSuccessResponse([]);
            }

            const items = profile[fieldName] || [];
            return createSuccessResponse(serializeDocument(items));
        } catch (error) {
            return createErrorResponse(error, `Failed to fetch ${fieldName}`);
        }
    };

    const update = async (itemId: string, data: Partial<T>): Promise<BaseResponse> => {
        try {
            await dbConnect();
            const userId = await getUserIdFromToken();

            const updateFields: Record<string, unknown> = { updatedAt: new Date() };

            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined) {
                    updateFields[`${fieldName}.$.${key}`] = value;
                }
            });

            const updated = await UserProfile.findOneAndUpdate(
                { userId, [`${fieldName}._id`]: itemId },
                { $set: updateFields },
                { new: true, runValidators: true }
            );

            if (!updated) {
                throw new Error(`${fieldName.slice(0, -1)} not found`);
            }

            return createSuccessResponse(null, `${fieldName.slice(0, -1)} updated successfully`);
        } catch (error) {
            return createErrorResponse(error, `Failed to update ${fieldName.slice(0, -1)}`);
        }
    };

    const remove = async (itemId: string): Promise<BaseResponse> => {
        try {
            await dbConnect();
            const userId = await getUserIdFromToken();

            const updated = await UserProfile.findOneAndUpdate(
                { userId },
                {
                    $pull: { [fieldName]: { _id: itemId } },
                    $set: { updatedAt: new Date() }
                },
                { new: true }
            );

            if (!updated) {
                throw new Error(`${fieldName.slice(0, -1)} not found`);
            }

            return createSuccessResponse({ deletedId: itemId }, `${fieldName.slice(0, -1)} deleted successfully`);
        } catch (error) {
            return createErrorResponse(error, `Failed to delete ${fieldName.slice(0, -1)}`);
        }
    };

    return { add, getAll, update, remove };
};

// ========================================
// SKILLS OPERATIONS
// ========================================

const skillsOperations = createCRUDOperations<SkillInput>('skills');

export const addSkill = skillsOperations.add;
export const getSkills = skillsOperations.getAll;
export const updateSkill = skillsOperations.update;
export const deleteSkill = skillsOperations.remove;

// ========================================
// PROJECTS OPERATIONS
// ========================================

export const addProject = async (data: ProjectInput): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        // Handle generic 'link' field logic
        const projectData = {
            title: data.title,
            description: data.description || '',
            technologies: data.technologies || [],
            githubLink: data.githubLink || (data.link?.includes('github.com') ? data.link : ''),
            liveLink: data.liveLink || (data.link && !data.link.includes('github.com') ? data.link : ''),
        };

        const updated = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $push: { projects: projectData },
                $set: { updatedAt: new Date() }
            },
            { new: true, upsert: true }
        );

        if (!updated) {
            throw new Error("Failed to add project");
        }

        const addedProject = updated.projects[updated.projects.length - 1];
        return createSuccessResponse(serializeDocument(addedProject));
    } catch (error) {
        return createErrorResponse(error, "Failed to add project");
    }
};

const projectsOperations = createCRUDOperations<ProjectInput>('projects');

export const getProjects = projectsOperations.getAll;
export const updateProject = projectsOperations.update;
export const deleteProject = projectsOperations.remove;

// ========================================
// OTHER OPERATIONS (using generic CRUD)
// ========================================

// Certifications
const certificationsOperations = createCRUDOperations<CertificationInput>('certifications');
export const addCertification = certificationsOperations.add;
export const getCertifications = certificationsOperations.getAll;
export const updateCertification = certificationsOperations.update;
export const deleteCertification = certificationsOperations.remove;

// Languages
const languagesOperations = createCRUDOperations<LanguageInput>('languages');
export const addLanguage = languagesOperations.add;
export const getLanguages = languagesOperations.getAll;
export const updateLanguage = languagesOperations.update;
export const deleteLanguage = languagesOperations.remove;

// Achievements
const achievementsOperations = createCRUDOperations<AchievementInput>('achievements');
export const addAchievement = achievementsOperations.add;
export const getAchievements = achievementsOperations.getAll;
export const updateAchievement = achievementsOperations.update;
export const deleteAchievement = achievementsOperations.remove;

// ========================================
// HOBBIES OPERATIONS (Special case - array of strings)
// ========================================

export const addHobby = async (data: HobbyInput): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const hobbyName = data.name.trim();
        if (!hobbyName) {
            throw new Error("Hobby name is required");
        }

        const updated = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $push: { hobbies: hobbyName },
                $set: { updatedAt: new Date() }
            },
            { new: true, upsert: true }
        );

        if (!updated) {
            throw new Error("Failed to add hobby");
        }

        return createSuccessResponse(null, "Hobby added successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to add hobby");
    }
};

export const getHobbies = async (): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const profile = await UserProfile.findOne({ userId }).select('hobbies');

        if (!profile) {
            return createSuccessResponse([]);
        }

        const hobbiesWithIds = profile.hobbies?.map((hobby: string, index: number) => ({
            id: index,
            name: hobby
        })) || [];

        return createSuccessResponse(hobbiesWithIds);
    } catch (error) {
        return createErrorResponse(error, "Failed to fetch hobbies");
    }
};

export const updateHobby = async (hobbyIndex: number, data: HobbyInput): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const newHobbyName = data.name.trim();
        if (!newHobbyName) {
            throw new Error("Hobby name is required");
        }

        const profile = await UserProfile.findOne({ userId }).select('hobbies');
        if (!profile?.hobbies || hobbyIndex >= profile.hobbies.length || hobbyIndex < 0) {
            throw new Error("Hobby not found");
        }

        const updateQuery = {
            [`hobbies.${hobbyIndex}`]: newHobbyName,
            updatedAt: new Date()
        };

        const updated = await UserProfile.findOneAndUpdate(
            { userId },
            { $set: updateQuery },
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new Error("Failed to update hobby");
        }

        return createSuccessResponse(null, "Hobby updated successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to update hobby");
    }
};

export const deleteHobby = async (hobbyIndex: number): Promise<BaseResponse> => {
    try {
        await dbConnect();
        const userId = await getUserIdFromToken();

        const profile = await UserProfile.findOne({ userId }).select('hobbies');
        if (!profile?.hobbies || hobbyIndex >= profile.hobbies.length || hobbyIndex < 0) {
            throw new Error("Hobby not found");
        }

        const updatedHobbies = [...profile.hobbies];
        updatedHobbies.splice(hobbyIndex, 1);

        const updated = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $set: {
                    hobbies: updatedHobbies,
                    updatedAt: new Date()
                }
            },
            { new: true }
        );

        if (!updated) {
            throw new Error("Failed to delete hobby");
        }

        return createSuccessResponse(null, "Hobby deleted successfully");
    } catch (error) {
        return createErrorResponse(error, "Failed to delete hobby");
    }
};