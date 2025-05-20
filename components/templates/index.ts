// src/resumeTemplates/index.ts
import ResumeTemplateMinimal from './ResumeTemplateMinimal'
import ResumeTemplateClassic from './ResumeTemplateClassic'
import ResumeTemplateCards from './ResumeTemplateCards'

export const templates = [
    {
        id: 'minimal',
        name: 'Minimal',
        component: ResumeTemplateMinimal,
        image: '/minimal.png'
    },
    {
        id: 'modern',
        name: 'Modern',
        component: ResumeTemplateCards,
        image: '/modern.png'
    },
    {
        id: 'creative',
        name: 'Creative',
        component: ResumeTemplateClassic,
        image: '/classic.png'
    },
]
