import { useEffect, useState } from "react";
import { JOBS_API_BASE_URL } from "./constants";

export function useJobs(searchTerm: string): [Job[], boolean] {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const paginatedJobs = jobs.slice(0, 7);

    useEffect(() => {
        if (!searchTerm || searchTerm.trim() === "") return;
        async function fetchData() {
            setIsLoading(true);

            const response = await fetch(`${JOBS_API_BASE_URL}/data?search=${searchTerm}`);
            const data = await response.json();

            setIsLoading(false);
            setJobs(data.jobItems);
        }

        fetchData();
    }, [searchTerm]);

    return [paginatedJobs, isLoading];
}

export function useActiveJobTracking(): [JobDetail | null, boolean] {
    const [activeJobId, setActiveJobId] = useState<number | null>(null);
    const [activeJobDetail, setActiveJobDetail] = useState<JobDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        if (!activeJobId) return;

        setActiveJobDetail(null); // Reset the active job detail when the ID changes.
        const fetchJobDetails = async () => {
            setIsLoading(true);

            const response = await fetch(`${JOBS_API_BASE_URL}/data/${activeJobId}`);
            const data = await response.json();

            setIsLoading(false);
            setActiveJobDetail(data.jobItem);
        };

        fetchJobDetails();
    }, [activeJobId]);

    return [activeJobDetail, isLoading];
}
