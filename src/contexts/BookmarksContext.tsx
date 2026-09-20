import { createContext } from "react";

export type TBookmarksContext = {
    bookmarkedIds: number[];
    handleBookmarkToggle: (jobId: number) => void;
    bookmarkedJobs: Job[];
    isLoading: boolean;
};
export const BookmarksContext = createContext<TBookmarksContext | null>(null);
