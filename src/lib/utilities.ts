import toast from "react-hot-toast";

export function minutesToMs(durationInMinutes: number) {
    return durationInMinutes * 60 * 1000; // 1 minute = 60 seconds, 1 second = 1000 milliseconds
}

export function secondsToMs(durationInSeconds: number) {
    return durationInSeconds * 1000; // 1 second = 1000 milliseconds
}

export const toastError = (error: unknown) =>
    error instanceof Error
        ? toast.error(error.message)
        : typeof error === "string"
          ? toast.error(error)
          : toast.error("Encountered an error.");
