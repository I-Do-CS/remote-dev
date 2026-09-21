import Spinner from "../../Misc/Spinner";
import EmptyJobDetails from "./EmptyJobDetails";
import JobDetails from "./JobDetails";

type JobDetailsContainerProps = {
    jobDetails: JobDetails | null;
    isLoading: boolean;
};

export default function JobDetailsContainer({ jobDetails, isLoading }: JobDetailsContainerProps) {
    return (
        <section className="job-details">
            <div>
                {!jobDetails && !isLoading && <EmptyJobDetails />}
                {!jobDetails && isLoading && <Spinner />}
                {jobDetails && !isLoading && <JobDetails jobDetails={jobDetails} />}
            </div>
        </section>
    );
}
