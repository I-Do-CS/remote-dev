import { create, StateCreator } from "zustand";
import { SortBy } from "../types";

interface JobsStore {
    readonly jobs: Job[];
    readonly activeJob: JobDetails | null;
    readonly sortBy: SortBy;
    setActiveJob: (job: JobDetails | null) => void;
    setJobs: (jobs: Job[]) => void;
    setSortBy: (sortBy: SortBy) => void;
}

const initializer: StateCreator<JobsStore> = (set) => ({
    jobs: [],
    activeJob: null,
    sortBy: "relevant",
    setActiveJob: (job: JobDetails | null) => set({ activeJob: job }),
    setJobs: (jobs: Job[]) => set({ jobs }),
    setSortBy: (sortBy) => {
        set((state) => ({
            sortBy,
            jobs: [...state.jobs].sort((a, b) => {
                if (sortBy === "recent") {
                    return a.daysAgo - b.daysAgo;
                }

                return b.relevantScore - a.relevantScore;
            }),
        }));
    },
});

const jobsStore = create(initializer);

export function useJobsStore(): JobsStore;

export function useJobsStore<T>(selector: (state: JobsStore) => T): T;

export function useJobsStore<T>(selector?: (state: JobsStore) => T) {
    return selector ? jobsStore(selector) : jobsStore();
}
