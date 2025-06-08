"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface UsePaginationProps {
    basePath?: string;
}

export function usePagination({ basePath = "/resume-checks" }: UsePaginationProps = {}) {
    const router = useRouter();

    const handlePageChange = useCallback((page: number) => {
        const url = page === 1 ? basePath : `${basePath}?page=${page}`;
        router.push(url);
    }, [router, basePath]);

    return { handlePageChange };
}