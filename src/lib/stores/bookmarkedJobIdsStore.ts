import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEYS } from "../constants";

interface BookmarkedJobsStore {
    readonly bookmarkedJobIds: number[];
    addBookmarkedJobId: (id: number) => void;
    removeBookmarkedJobId: (id: number) => void;
}

const initializer: StateCreator<BookmarkedJobsStore> = (set, get) => ({
    bookmarkedJobIds: [],

    addBookmarkedJobId: (id) => {
        const { bookmarkedJobIds } = get();

        if (!bookmarkedJobIds.includes(id)) {
            set({
                bookmarkedJobIds: [...bookmarkedJobIds, id],
            });
        }
    },

    removeBookmarkedJobId: (id) =>
        set({
            bookmarkedJobIds: get().bookmarkedJobIds.filter((jobId) => jobId !== id),
        }),
});

const bookmarkedJobIdsStore = create(
    persist(initializer, {
        name: LOCAL_STORAGE_KEYS.BOOKMARKED_IDS,
        partialize: (state) => ({
            bookmarkedJobIds: state.bookmarkedJobIds,
        }),
    }),
);

export function useBookmarkedJobIdsStore(): BookmarkedJobsStore;

export function useBookmarkedJobIdsStore<T>(selector: (state: BookmarkedJobsStore) => T): T;

export function useBookmarkedJobIdsStore<T>(selector?: (state: BookmarkedJobsStore) => T) {
    return selector ? bookmarkedJobIdsStore(selector) : bookmarkedJobIdsStore();
}
