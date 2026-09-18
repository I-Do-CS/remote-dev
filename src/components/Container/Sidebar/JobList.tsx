import Spinner from "../../Misc/Spinner";
import JobListItem from "./JobListItem";

type JobListProps = {
    jobItems: Job[];
    isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
    return (
        <ul className="job-list">
            {isLoading && <Spinner />}

            {!isLoading && jobItems.map((item) => <JobListItem key={item.id} item={item} />)}
        </ul>
    );
}

export default JobList;
