import JobsList from "../Shared/JobsList";

type BookmarksPopoverProps = {
    jobs: Job[];
    activeJobId: number | null;
    isLoading: boolean;
};

export default function BookmarksPopover({ jobs, activeJobId, isLoading }: BookmarksPopoverProps) {
    return (
        <div className="bookmarks-popover">
            <JobsList activeJobId={activeJobId} isLoading={isLoading} jobs={jobs} />
        </div>
    );
}
