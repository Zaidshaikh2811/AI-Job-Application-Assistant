// models/ResumeCheckResult.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface defining the document properties
export interface ResumeCheckResultDocument extends Document {
    userId: mongoose.Types.ObjectId;

    jobTitle: string;
    company: string;
    jobUrl?: string;
    fitRatio: number;
    keywordMatch: {
        matched: string[];
        missing: string[];
    };
    suggestions: {
        sections: Record<string, string[]>;
        general: string[];
    };
    skillGaps: string[];
    strengths: string[];
    createdAt: Date;
}

// Create the schema
const ResumeCheckResultSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    jobUrl: {
        type: String
    },
    fitRatio: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    keywordMatch: {
        matched: [String],
        missing: [String]
    },
    suggestions: {
        sections: {
            type: Map,
            of: [String]
        },
        general: [String]
    },
    skillGaps: [String],
    strengths: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Add indexes for common queries
ResumeCheckResultSchema.index({ createdAt: -1 });
ResumeCheckResultSchema.index({ fitRatio: -1 });

// Create and export the model
const ResumeCheckResult = mongoose.models.ResumeCheckResult ||
    mongoose.model<ResumeCheckResultDocument>('ResumeCheckResult', ResumeCheckResultSchema);

export default ResumeCheckResult;