/* eslint-disable @typescript-eslint/no-explicit-any */
// src/resumeTemplates/index.ts

import ResumeTemplateMinimal from './ResumeTemplateMinimal'
import ResumeTemplateCards from './ResumeTemplateCards'
import MonospaceFriendly from './MonospaceFriendly'
import ResumeTableLayout from './ResumeTableLayout'





export const templateMap: { [key: string]: { id: string, name: string, component: React.FC<{ data: any }>, image: string } } = {
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
    monorepo: {
        id: 'monorepo',
        name: ' monorepo',
        component: MonospaceFriendly,
        image: '/modern.png',
    },
    resumetable: {
        id: 'resumetable',
        name: 'resumetable',
        component: ResumeTableLayout,
        image: '/modern.png',
    },
} as const;

export type TemplateId = keyof typeof templateMap;

export const templateList = Object.values(templateMap);

export type ResumeTemplate = typeof templateMap[TemplateId];