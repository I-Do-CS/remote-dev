import { useEffect } from "react";
import { SortBy } from "../../types";
import { useJobsStore } from "../../stores/jobsStore";
import { useQuery } from "@tanstack/react-query";
import { JOBS_API_BASE_URL, QUERY_KEYS, QUERY_STALE_TIMES } from "../../constants";
import { httpClient, toaster } from "../../utilities";
import { ServerResponseForJobs } from "../../../models/ServerResponses";

export default function useJobs(
    searchTerm?: string,
    sortBy: SortBy = "relevant",
): {
    jobs: Job[] | null;
    currentSortBy: SortBy;
    isLoading: boolean;
} {
    const jobStore = useJobsStore((state) => ({
        jobs: state.jobs,
        setJobs: state.setJobs,
        sortBy: state.sortBy,
        setSortBy: state.setSortBy,
    }));

    useEffect(() => {
        jobStore.setSortBy(sortBy);
    }, [jobStore, sortBy]);

    searchTerm = searchTerm?.trim() || "";
    const queryFn = httpClient.get<ServerResponseForJobs>(`${JOBS_API_BASE_URL}/data`, {
        search: searchTerm,
    });

    const { data, isInitialLoading } = useQuery([QUERY_KEYS.JOBS, searchTerm], () => queryFn, {
        staleTime: QUERY_STALE_TIMES.JOBS,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: Boolean(searchTerm) && (searchTerm?.length ?? 0) > 0,
        onError: (error: unknown) => toaster.error(error),
    });

    jobStore.setJobs(data?.jobItems || []);

    // apply the sortBy filter to the jobs list and save it in store
    return {
        jobs: data?.jobItems || null,
        currentSortBy: jobStore.sortBy,
        isLoading: isInitialLoading,
    };
}
