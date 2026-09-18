import Spinner from "../../Misc/Spinner";
import JobsListItem from "./JobsListItem";

type JobsListProps = {
    jobs: Job[];
    isLoading: boolean;
    activeJobId?: number;
};

export default function JobsList({ jobs, isLoading, activeJobId }: JobsListProps) {
    return (
        <ul className="job-list">
            {isLoading && <Spinner />}

            {!isLoading &&
                jobs.map((item) => {
                    const isActive = activeJobId ? item.id === activeJobId : false;
                    return <JobsListItem key={item.id} item={item} isActive={isActive} />;
                })}
        </ul>
    );
}
