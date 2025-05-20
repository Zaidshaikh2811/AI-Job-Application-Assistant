import { GoogleGenAI } from '@google/genai';

type WorkExperience = {
    title?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
};

interface GenerateResumeParams {
    jobDescription: string;
    personalName: string;
    email: string;
    phone?: string;
    linkedin?: string;
    jobTitle: string;
    companyName: string;
    jobLocation?: string;
    tone: string;
    workExperiences: WorkExperience[];
    skills: string[];
    education?: string;
    certifications?: string;
    projects?: string;
    resumeFilePresent: boolean;
}

export async function generateResumeFromJobData(params: GenerateResumeParams) {


    const {
        jobDescription,
        personalName,
        email,
        phone,
        linkedin,
        jobTitle,
        companyName,
        jobLocation,
        tone,
        workExperiences,
        skills,
        education,
        certifications,
        projects,
        resumeFilePresent,
    } = params;

    const prompt = `
You are a professional resume writer and career coach. Using the following information, create a polished, ATS-friendly resume that highlights the candidate's strengths and matches the given job description perfectly.

Job Description:
---
${jobDescription}
---

Candidate Details:

Full Name: ${personalName}
Email: ${email}
Phone: ${phone || "N/A"}
LinkedIn: ${linkedin || "N/A"}

Job Title Applying For: ${jobTitle}
Company Name: ${companyName}
Job Location: ${jobLocation || "N/A"}
Tone: ${tone}

Work Experience:
${workExperiences
            .map(
                (we) => `
- Job Title: ${we.title || "N/A"}
- Company: ${we.company || "N/A"}
- Start Date: ${we.startDate || "N/A"}
- End Date: ${we.endDate || "N/A"}
- Description / Achievements: ${we.description || "N/A"}
`
            )
            .join("\n")}

Skills:
${skills.length ? skills.join(", ") : "N/A"}

Education:
${education || "N/A"}

Certifications:
${certifications || "N/A"}

Projects:
${projects || "N/A"}

Resume File Present: ${resumeFilePresent ? "Yes" : "No"}

...
Instructions:
- Format the resume to be clean, ATS-compliant, and easy to parse.
- Use clear section headers: Summary, Work Experience, Skills, Education, Certifications, Projects, Contact Information.
- Tailor keywords and skills to closely align with the job description.
- Use concise bullet points emphasizing achievements and responsibilities.
- Use the ${tone} style in the writing.
- Exclude unnecessary fluff, focus on impact and results.
- Include dates in a consistent format (e.g., MM/YYYY).
- Highlight the candidate’s strongest skills and relevant experience.

Please return the resume data ONLY in JSON format with the following keys:

{
  "summary": string,
  "workExperience": [
    {
      "jobTitle": string,
      "company": string,
      "startDate": string,
      "endDate": string,
      "description": string
    }
  ],
  "skills": string[],
  "education": string,
  "certifications": string,
  "projects": string,
  "contactInformation": {
    "name": string,
    "email": string,
    "phone": string,
    "linkedin": string
  }
}

Make sure the JSON is properly formatted and parsable.
No extra explanation, only JSON.
`;



    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

    const model = 'gemini-2.0-flash';

    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];

    const config = {
        responseMimeType: 'text/plain',
    };

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });



    return (response.text ?? '').trim();

}
