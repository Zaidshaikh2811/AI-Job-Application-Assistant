// ResumeChecksPage.tsx
import { getpaginatedResumeChecks } from "@/actions/resume";
import ResumeChecksCards from "./ResumeChecksCards";
import { redirect } from "next/navigation";

interface Props {
    searchParams: Promise<{ page?: string }>;
}

export default async function ResumeChecksPage({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams.page) || 1;
    const limit = 10;

    const data = await getpaginatedResumeChecks(currentPage, limit);

    if (!data ||!data.totalPages || data.totalPages < currentPage) {
        redirect("/resume-checks?page=1");
    }

    return (
        <div>
            <ResumeChecksCards
                data={data.data}
                totalResults={data.totalResults}
                totalPages={data.totalPages}
                currentPage={data.currentPage}
                isLoading={false}
            />
        </div>
    );
}