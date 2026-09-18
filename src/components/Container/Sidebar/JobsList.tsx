import Spinner from "../../Misc/Spinner";
import JobsListItem from "./JobsListItem";

type JobsListProps = {
    jobs: Job[];
    isLoading: boolean;
};

export default function JobsList({ jobs, isLoading }: JobsListProps) {
    return (
        <ul className="job-list">
            {isLoading && <Spinner />}

            {!isLoading && jobs.map((item) => <JobsListItem key={item.id} item={item} />)}
        </ul>
    );
}
