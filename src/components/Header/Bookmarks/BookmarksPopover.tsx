import { createPortal } from "react-dom";
import JobsList from "../../Shared/JobsList";

type BookmarksPopoverProps = {
    jobs: Job[];
    activeJobId: number | null;
    isLoading: boolean;
    ref: React.RefObject<HTMLDivElement>; // Add this line to define the ref prop
};

export default function BookmarksPopover({
    jobs,
    activeJobId,
    isLoading,
    ref,
}: BookmarksPopoverProps) {
    return createPortal(
        <div ref={ref} className="bookmarks-popover">
            <JobsList activeJobId={activeJobId} isLoading={isLoading} jobs={jobs} />
        </div>,
        document.body,
    );
}
