/* eslint-disable @typescript-eslint/no-explicit-any */
// src/resumeTemplates/index.ts

import { ClassicBlueTemplate } from "./ClassicBlueTemplate";
import { CreativeTwoColumnTemplate } from "./CreativeTwoColumnTemplate ";
import { ExecutiveTemplate } from "./ExecutiveTemplate";
import { MinimalistTemplate } from "./MinimalistTemplate";
import { ModernDarkTemplate } from "./ModernDarkTemplate";
import ResumeFirst from "./ResumeFirst";






export const templateMap: { [key: string]: { id: string, name: string, component: React.FC<{ resumeData: any }>, image: string } } = {
    minimal: {
        id: 'first',
        name: 'first',
        component: ResumeFirst,
        image: '/minimal.png',
    },
    ClassicBlueTemplate: {
        id: 'ClassicBlueTemplate',
        name: 'ClassicBlueTemplate',
        component: ClassicBlueTemplate,
        image: '/minimal.png',
    },
    ModernDarkTemplate: {
        id: 'ModernDarkTemplate',
        name: 'ModernDarkTemplate',
        component: ModernDarkTemplate,
        image: '/minimal.png',
    },
    MinimalistTemplate: {
        id: 'MinimalistTemplate',
        name: 'MinimalistTemplate',
        component: MinimalistTemplate,
        image: '/minimal.png',
    },
    CreativeTwoColumnTemplate: {
        id: 'CreativeTwoColumnTemplate',
        name: 'CreativeTwoColumnTemplate',
        component: CreativeTwoColumnTemplate,
        image: '/minimal.png',
    },
    ExecutiveTemplate: {
        id: 'ExecutiveTemplate',
        name: 'ExecutiveTemplate',
        component: ExecutiveTemplate,
        image: '/minimal.png',
    },
} as const;

export const templateList = Object.values(templateMap).map(template => ({
    id: template.id,
    name: template.name,
    image: template.image,
}));

export const getTemplateById = (id: string) => {
    return templateMap[id] || null;
}