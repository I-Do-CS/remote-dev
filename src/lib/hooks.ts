import { useEffect, useState } from "react";
import { JOBS_API_BASE_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { minutesToMs } from "./utilities";

const fetchJobs = async (searchTerm: string): Promise<Job[]> => {
    const response = await fetch(`${JOBS_API_BASE_URL}/data?search=${searchTerm}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description);
    }
    const data = await response.json();

    return data.jobItems;
};

const fetchJobDetail = async (id: number): Promise<JobDetail | null> => {
    const response = await fetch(`${JOBS_API_BASE_URL}/data/${id}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description);
    }

    const data = await response.json();
    return data.jobItem ? data.jobItem : null;
};

export function useDebounce<T>(value: T, delay: number = 500) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

export function useJobs(searchTerm: string): {
    jobs: Job[];
    isLoading: boolean;
} {
    const { data: jobs, isInitialLoading: isLoading } = useQuery(
        ["jobs", searchTerm],
        () => fetchJobs(searchTerm),
        {
            staleTime: minutesToMs(2), // 2 minutes
            refetchOnWindowFocus: false,
            retry: false,
            enabled: searchTerm.trim().length > 0,
            onError: (error) => {
                console.log(error);
            },
        },
    );

    const jobsToReturn: Job[] = jobs ?? [];

    return { jobs: jobsToReturn, isLoading };
}

export function useActiveJobTracking(): [JobDetail | null, boolean] {
    const [activeJobId, setActiveJobId] = useState<number | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            const id = window.location.hash.slice(1);
            id ? setActiveJobId(parseInt(id)) : setActiveJobId(null);
        };

        handleHashChange(); // Initial call to set the active job ID based on the current hash.
        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const { data: activeJobDetail, isInitialLoading: isLoading } = useQuery(
        ["job-detail", activeJobId],
        () => fetchJobDetail(activeJobId!),
        {
            staleTime: minutesToMs(10),
            refetchOnWindowFocus: false,
            retry: false,
            enabled: Boolean(activeJobId), // Only fetch if activeJobId is not null
            onError: (error) => {
                console.log(error);
            },
        },
    );

    return [activeJobDetail ?? null, isLoading];
}
