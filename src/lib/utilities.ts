import toast from "react-hot-toast";
import { HttpError } from "./types";

// TODO: Delete this once refactoring is done
export function minutesToMs(durationInMinutes: number) {
    return durationInMinutes * 60 * 1000; // 1 minute = 60 seconds, 1 second = 1000 milliseconds
}

// TODO: Delete this once refactoring is done
export function secondsToMs(durationInSeconds: number) {
    return durationInSeconds * 1000; // 1 second = 1000 milliseconds
}

export const durationConverter = {
    // 1 minute = 60 seconds, 1 second = 1000 milliseconds
    minutesToMs: (durationInMinutes: number) => durationInMinutes * 60 * 1000,

    // 1 second = 1000 milliseconds
    secondsToMs: (durationInSeconds: number) => durationInSeconds * 1000,
};

export const toaster = {
    success: (message: string) => toast.success(message),
    error: (error: unknown) =>
        error instanceof HttpError
            ? toast.error("Encountered an error while making the request. Please try again later.")
            : error instanceof Error
              ? toast.error(error.message)
              : typeof error === "string"
                ? toast.error(error)
                : toast.error("Encountered an error."),
};

// TODO: Delete this once refactoring is done
export const toastError = (error: unknown) =>
    error instanceof HttpError
        ? toast.error("Encountered an error while making the request. Please try again later.")
        : error instanceof Error
          ? toast.error(error.message)
          : typeof error === "string"
            ? toast.error(error)
            : toast.error("Encountered an error.");

export const httpClient = {
    get: async <T>(url: string, params?: Record<string, string>): Promise<T> => {
        let requestUrl = url;

        // 1. Handle params safely, converting numbers/booleans and checking for existing '?'
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                searchParams.append(key, String(value));
            });

            const queryString = searchParams.toString();
            if (queryString) {
                const separator = requestUrl.includes("?") ? "&" : "?";
                requestUrl = `${requestUrl}${separator}${queryString}`;
            }
        }

        // 2. Pass along headers, abort signals, credentials, etc.
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new HttpError(response.status, response.statusText, requestUrl);
        }

        // 3. Prevent JSON parse errors on empty 204 responses
        if (response.status === 204) {
            return null as unknown as T;
        }

        try {
            return (await response.json()) as T;
        } catch (error) {
            // 4. Retain the original error context
            throw new Error("Failed to parse JSON response.");
        }
    },
};

// async function fetchJobs(searchTerm?: string): Promise<Job[]> {
//     const fetchUrl = searchTerm
//         ? `${JOBS_API_BASE_URL}/data?search=${searchTerm}`
//         : `${JOBS_API_BASE_URL}/data`;

//     const response = await fetch(fetchUrl);
//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.description);
//     }
//     const data = await response.json();

//     return data.jobItems;
// }
