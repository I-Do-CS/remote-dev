import { createPortal } from "react-dom";
import JobsList from "../../Shared/JobsList";

type BookmarksPopoverProps = {
    jobs: Job[];
    activeJobId: number | null;
    isLoading: boolean;
    popoverRef: React.RefObject<HTMLDivElement>;
};

export default function BookmarksPopover({
    jobs,
    activeJobId,
    isLoading,
    popoverRef,
}: BookmarksPopoverProps) {
    return createPortal(
        <div ref={popoverRef} className="bookmarks-popover">
            <JobsList activeJobId={activeJobId} isLoading={isLoading} jobs={jobs} />
        </div>,
        document.body,
    );
}
