export type WorkExperience = {
    company: string
    role: string
    startDate: string
    endDate?: string
    description?: string
    jobTitle?: string
    title?: string
    location?: string
}

export type Education = {
    institution: string
    degree: string
    fieldOfStudy?: string
    startDate?: string
    endDate?: string
    year: string
    gpa?: string
}

export type ContactInformation = {
    personalName: string
    email: string
    phone: string
    address?: string
    [key: string]: string | undefined
}

export type Project = {
    name: string
    description?: string
    technologies?: string[]
}

export type Certification = {
    name: string
    issuer?: string
    date?: string
}

export type ResumeData = {
    _id: string
    contactInformation: ContactInformation
    summary: string
    description?: string[];

    skills: string[]
    workExperience: WorkExperience[]
    education: Education[]
    location?: string
    certifications?: {
        name: string
        issuer?: string
        date?: string
    }[]
    projects?: {
        name: string
        description?: string
        link?: string
    }[]
    [key: string]: unknown
}
