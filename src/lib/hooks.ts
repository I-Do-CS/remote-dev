import { useEffect, useState } from "react";
import { JOBS_API_BASE_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { httpClient, durationConverter, toaster } from "./utilities";
import { ServerResponseForJobDetail, ServerResponseForJobs, SortBy } from "./types";

// TODO: Delete this once done refactoring

export function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handler]);
}

export function usePersistedState<T>(
    key: string,
    initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                return JSON.parse(storedValue);
            }
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export function useResettableState<T>(
    initialValue: T,
    dependencies: unknown[],
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [...dependencies, initialValue]);

    return [value, setValue];
}

export function usePaginatedJobs(
    currentPage: number,
    pageSize: number,
    jobs: Job[],
): { totalPages: number; paginatedJobs: Job[] } {
    const paginatedJobs = jobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const totalPages = Math.ceil(jobs.length / pageSize);

    return jobs.length > 0 ? { totalPages, paginatedJobs } : { totalPages: 0, paginatedJobs };
}

export function useDebounce<T>(value: T, delay: number = 500) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

export function useFilteredJobs(filterByIds: number[]): {
    jobs: Job[];
    isLoading: boolean;
} {
    const { data: jobs, isInitialLoading: isLoading } = useQuery(
        ["filtered-jobs", filterByIds],
        () => fetchJobs(),
        {
            staleTime: durationConverter.minutesToMs(2), // 2 minutes
            refetchOnWindowFocus: false,
            retry: false,
            onError: (error: unknown) => toaster.error(error),
        },
    );

    let jobsToReturn: Job[] = jobs ?? [];
    if (filterByIds.length > 0) {
        jobsToReturn = jobsToReturn.filter((job) => filterByIds.includes(job.id));
    }

    return { jobs: jobsToReturn, isLoading };
}

export function useSearchedJobs(
    searchTerm: string,
    sortBy: SortBy = "relevant",
): {
    jobs: Job[];
    isLoading: boolean;
} {
    const { data: jobs, isInitialLoading: isLoading } = useQuery(
        ["jobs", searchTerm],
        () => fetchJobs(searchTerm),
        {
            staleTime: durationConverter.minutesToMs(2), // 2 minutes
            refetchOnWindowFocus: false,
            retry: false,
            enabled: searchTerm.trim().length > 0,
            onError: (error: unknown) => toaster.error(error),
        },
    );

    let jobsToReturn: Job[] = jobs ?? [];

    // Apply sorting
    if (sortBy === "recent") {
        jobsToReturn = [...jobsToReturn].sort((a, b) => a.daysAgo - b.daysAgo);
    } else if (sortBy === "relevant") {
        jobsToReturn = [...jobsToReturn].sort((a, b) => b.relevantScore - a.relevantScore);
    }

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
            staleTime: durationConverter.minutesToMs(10),
            refetchOnWindowFocus: false,
            retry: false,
            enabled: Boolean(activeJobId), // Only fetch if activeJobId is not null
            onError: (error: unknown) => toaster.error(error),
        },
    );

    return [activeJobDetail ?? null, isLoading];
}

async function fetchJobs(searchTerm?: string): Promise<Job[]> {
    const fetchUrl = searchTerm
        ? `${JOBS_API_BASE_URL}/data?search=${searchTerm}`
        : `${JOBS_API_BASE_URL}/data`;

    return (await httpClient.get<ServerResponseForJobs>(fetchUrl)).jobItems;
}

async function fetchJobDetail(id: number): Promise<JobDetail | null> {
    const data = await httpClient.get<ServerResponseForJobDetail>(
        `${JOBS_API_BASE_URL}/data/${id}`,
    );

    console.log(data);
    return data.jobItem ? data.jobItem : null;
}
