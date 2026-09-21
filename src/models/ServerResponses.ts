export interface ServerResponseForJobs {
    jobItems: Job[];
    public: boolean;
    sorted: boolean;
}

export interface ServerResponseForJobDetails {
    jobItem: JobDetails;
    public: boolean;
}
