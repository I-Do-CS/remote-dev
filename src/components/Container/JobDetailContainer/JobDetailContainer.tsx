import Spinner from "../../Misc/Spinner";
import EmptyJobDetail from "./EmptyJobDetail";
import JobDetail from "./JobDetail";

type JobDetailContainerProps = {
    jobDetail: JobDetail | null;
    isLoading: boolean;
};

export default function JobDetailContainer({ jobDetail, isLoading }: JobDetailContainerProps) {
    return (
        <section className="job-details">
            <div>
                {!jobDetail && !isLoading && <EmptyJobDetail />}
                {!jobDetail && isLoading && <Spinner />}
                {jobDetail && !isLoading && <JobDetail jobDetail={jobDetail} />}
            </div>
        </section>
    );
}

