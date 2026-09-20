import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "../Misc/BookmarksPopover";
import { useState } from "react";
import { useBookmarksContext } from "../../contexts/hooks";
import { useActiveJobTracking } from "../../lib/hooks";

export default function BookmarksButton() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { bookmarkedJobs, isLoading } = useBookmarksContext();
    const [activeJob] = useActiveJobTracking();
    const handlePopoverToggle = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    return (
        <section>
            <button className="bookmarks-btn" onClick={handlePopoverToggle}>
                Bookmarks <TriangleDownIcon />
            </button>

            {isPopoverOpen && (
                <BookmarksPopover
                    activeJobId={activeJob ? activeJob.id : null}
                    isLoading={isLoading}
                    jobs={bookmarkedJobs}
                />
            )}
        </section>
    );
}
