import { LOCAL_STORAGE_KEYS } from "../lib/constants";
import { useFilteredJobs, usePersistedState } from "../lib/hooks";
import { BookmarksContext } from "./BookmarksContext";

type BookmarksContextProviderProps = { children: React.ReactNode };

export default function BookmarksContextProvider({ children }: BookmarksContextProviderProps) {
    const [bookmarkedIds, setBookmarkedIds] = usePersistedState<number[]>(
        LOCAL_STORAGE_KEYS.BOOKMARKED_IDS,
        [],
    );
    const handleBookmarkToggle = (jobId: number) => {
        if (bookmarkedIds.includes(jobId)) {
            setBookmarkedIds((prev) => prev.filter((id) => id !== jobId));
        } else {
            setBookmarkedIds((prev) => [...prev, jobId]);
        }
    };
    const { jobs: bookmarkedJobs, isLoading } = useFilteredJobs(bookmarkedIds);

    return (
        <BookmarksContext.Provider
            value={{
                bookmarkedIds,
                handleBookmarkToggle,
                bookmarkedJobs,
                isLoading,
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
}
