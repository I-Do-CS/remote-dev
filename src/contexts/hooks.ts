import { useContext } from "react";
import { BookmarksContext, TBookmarksContext } from "./BookmarksContextProvider";

export function useBookmarksContext(): TBookmarksContext {
    const context = useContext(BookmarksContext);
    if (!context) {
        throw new Error("useContext must be used within a BookmarksContextProvider");
    }
    return context;
}
