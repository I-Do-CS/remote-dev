import { useQueries } from "@tanstack/react-query";
import { useBookmarkedJobIdsStore } from "../../stores/bookmarkedJobIdsStore";
import { JOBS_API_BASE_URL, QUERY_KEYS, QUERY_STALE_TIMES } from "../../constants";
import { httpClient, toaster } from "../../utilities";
import { ServerResponseForJobDetails } from "../../../models/ServerResponses";

export default function useBookmarkedJobDetails(): {
    bookmarkedJobDetails: JobDetails[];
    isLoading: boolean;
} {
    const bookmarkedJobIds = useBookmarkedJobIdsStore((state) => state.bookmarkedJobIds);
    const queries = useQueries({
        queries: bookmarkedJobIds.map((id) => ({
            queryKey: [QUERY_KEYS.JOB_DETAILS, id],
            queryFn: async () => {
                const data = await httpClient.get<ServerResponseForJobDetails>(
                    `${JOBS_API_BASE_URL}/data/${id}`,
                );

                return data.jobItem as JobDetails;
            },
            staleTime: QUERY_STALE_TIMES.JOB_DETAILS,
            refetchOnWindowFocus: false,
            retry: false,
            onError: (error: unknown) => toaster.error(error),
        })),
    });

    const isLoading = queries.some((query) => query.isLoading);
    const bookmarkedJobDetails = queries
        .map((query) => query.data)
        .filter((jobDetails) => jobDetails !== undefined) as JobDetails[];

    return { bookmarkedJobDetails, isLoading };
}
