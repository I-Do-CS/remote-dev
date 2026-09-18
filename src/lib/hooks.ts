import { useEffect, useState } from "react";
import { JOBS_BASE_URL } from "./constants";

export function useJobs(searchTerm: string) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!searchTerm || searchTerm.trim() === "") return;
        async function fetchData() {
            setIsLoading(true);

            const response = await fetch(`${JOBS_BASE_URL}?search=${searchTerm}`);
            const data = await response.json();

            setIsLoading(false);
            setJobs(data.jobItems);
        }

        fetchData();
    }, [searchTerm]);

    return { jobs, isLoading };
}
