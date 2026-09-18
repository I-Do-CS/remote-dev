import JobListItem from "./JobListItem";

type JobListProps = {
    jobItems: Job[];
};

export function JobList({ jobItems }: JobListProps) {
    return (
        <ul className="job-list">
            {jobItems.map((item) => (
                <JobListItem key={item.id} item={item} />
            ))}
        </ul>
    );
}

export default JobList;
