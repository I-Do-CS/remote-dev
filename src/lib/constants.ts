export const JOBS_API_BASE_URL = "https://bytegrad.com/course-assets/projects/rmtdev/api";

export const SEARCH_DELAY = 500;

export const PAGINATION_PAGESIZE = 7;

export const LOCAL_STORAGE_KEYS = {
    BOOKMARKED_IDS: "bookmarked-ids",
};

export const QUERY_STALE_TIMES = {
    JOBS: 2 * 60 * 1000, // 2 minutes
    JOB_DETAILS: 10 * 60 * 1000, // 10 minutes
    BOOKMARKED_JOBS: 2 * 60 * 1000, // 2 minutes
};

export const QUERY_KEYS = {
    JOBS: "jobs",
    JOB_DETAILS: "job-details",
    BOOKMARKED_JOBS: "bookmarked-jobs",
};
