import { createPortal } from "react-dom";
import JobsList from "../Shared/JobsList";

type BookmarksPopoverProps = {
    jobs: Job[];
    activeJobId: number | null;
    isLoading: boolean;
};

export default function BookmarksPopover({ jobs, activeJobId, isLoading }: BookmarksPopoverProps) {
    return createPortal(
        <div className="bookmarks-popover">
            <JobsList activeJobId={activeJobId} isLoading={isLoading} jobs={jobs} />
        </div>,
        document.body,
    );
}
