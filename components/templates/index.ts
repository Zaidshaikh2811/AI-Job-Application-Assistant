// src/resumeTemplates/index.ts

import ResumeTemplateMinimal from './ResumeTemplateMinimal'
import ResumeTemplateClassic from './ResumeTemplateClassic'
import ResumeTemplateCards from './ResumeTemplateCards'

export const templateMap = {
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
    creative: {
        id: 'creative',
        name: 'Creative',
        component: ResumeTemplateClassic,
        image: '/classic.png',
    },
} as const;

export type TemplateId = keyof typeof templateMap;

export const templateList = Object.values(templateMap); // for showing all templates (if needed)

export type ResumeTemplate = typeof templateMap[TemplateId];