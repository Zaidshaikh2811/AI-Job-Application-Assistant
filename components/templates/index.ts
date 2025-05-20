// src/resumeTemplates/index.ts

import ResumeTemplateMinimal from './ResumeTemplateMinimal'
import ResumeTemplateCards from './ResumeTemplateCards'
import { ResumeData } from '@/lib/types/resume';





export const templateMap: { [key: string]: { id: string, name: string, component: React.FC<{ data: ResumeData }>, image: string } } = {
    minimal: {
        id: 'minimal',
        name: 'Minimal',
        component: ResumeTemplateMinimal,
        image: '/minimal.png',
    },
    modern: {
        id: 'modern',
        name: 'Modern',
        component: ResumeTemplateCards,
        image: '/modern.png',
    },
} as const;

export type TemplateId = keyof typeof templateMap;

export const templateList = Object.values(templateMap);

export type ResumeTemplate = typeof templateMap[TemplateId];