export type SortBy = "relevant" | "recent";

export type PaginatorDirection = "previous" | "next";

export type ServerResponseForJobs = {
    jobItems: Job[];
    public: boolean;
    sorted: boolean;
};

export type ServerResponseForJobDetail = {
    jobItem: JobDetail;
    public: boolean;
};

export class HttpError extends Error {
    constructor(
        public readonly status: number,
        public readonly statusText: string,
        public readonly url: string,
    ) {
        super(`HTTP ${status}: ${statusText}`);
        this.name = "HttpError";
    }
}
