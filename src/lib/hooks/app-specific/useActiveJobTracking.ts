import { useEffect, useState } from "react";
import { useJobsStore } from "../../stores/jobsStore";
import { JOBS_API_BASE_URL, QUERY_KEYS, QUERY_STALE_TIMES } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { ServerResponseForJobDetails } from "../../../models/ServerResponses";
import { httpClient, toaster } from "../../utilities";

export default function useActiveJobTracking(): {
    activeJob: JobDetails | null;
    isLoading: boolean;
} {
    const { activeJob, setActiveJob } = useJobsStore((state) => ({
        activeJob: state.activeJob,
        setActiveJob: state.setActiveJob,
    }));
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

    const activeJobQueryUrl = `${JOBS_API_BASE_URL}/data/${activeJobId}`;
    const { data, isInitialLoading } = useQuery(
        [QUERY_KEYS.JOB_DETAILS, activeJobId],
        () => httpClient.get<ServerResponseForJobDetails>(activeJobQueryUrl),
        {
            staleTime: QUERY_STALE_TIMES.JOB_DETAILS,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: Boolean(activeJobId), // Only fetch if activeJobId is not null
            onError: (error: unknown) => toaster.error(error),
        },
    );
    setActiveJob(data?.jobItem ?? null); // Update the active job in the store with the fetched data.

    return {
        activeJob,
        isLoading: isInitialLoading,
    };
}
