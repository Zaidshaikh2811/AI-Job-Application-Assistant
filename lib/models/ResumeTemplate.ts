
import mongoose, { Schema, Document } from 'mongoose';

export interface IResumeTemplate extends Document {
    id: string; // unique key, e.g. "minimal", "modern"
    name: string;
    previewImage: string;
    templateHtml: string; // HTML string with placeholders like {{summary}}, {{education}}, etc.
    createdAt?: Date;
    updatedAt?: Date;
}

const ResumeTemplateSchema: Schema = new Schema(
    {
        id: { type: String, required: true, unique: true }, // e.g., 'minimal', 'classic'
        name: { type: String, required: true }, // Human-readable
        previewImage: { type: String, required: true }, // URL to image
        templateHtml: { type: String, required: true }, // HTML with {{placeholders}}
    },
    { timestamps: true }
);

export default mongoose.model<IResumeTemplate>('ResumeTemplate', ResumeTemplateSchema);
