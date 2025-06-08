

export const metadata = {
    title: "Resume Check",
    description: "Upload your resume and a job description to get personalized improvement suggestions.",
}


export default function ResumeCheckPage() {
    return (
        <div className="container space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Resume Check</h1>
                <p className="text-muted-foreground">
                    Upload your resume and a job description to get personalized improvement suggestions.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                {/* ResumeCheck component will be rendered here */}
            </div>
        </div>
    );
}