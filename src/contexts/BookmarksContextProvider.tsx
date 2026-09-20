import { createContext } from "react";
import { LOCAL_STORAGE_KEYS } from "../lib/constants";
import { usePersistedState } from "../lib/hooks";

export type TBookmarksContext = {
    bookmarkedIds: number[];
    handleBookmarkToggle: (jobId: number) => void;
};
export const BookmarksContext = createContext<TBookmarksContext | null>(null);
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

    return (
        <BookmarksContext.Provider
            value={{
                bookmarkedIds,
                handleBookmarkToggle,
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
}
