import { getpaginatedResumeChecks } from "@/actions/resume";
import ResumeChecksCards from "./ResumeChecksCards"; // Import the client component

// Server component that fetches data
export default async function ResumeChecksPage() {
    const data = await getpaginatedResumeChecks(1, 10);
    console.log("Fetched data for resume checks:", data);
    return (
        <ResumeChecksCards
            data={data.data || data}
            totalResults={data.total || data.length}
        />
    );
}