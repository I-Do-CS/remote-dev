import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "../Misc/BookmarksPopover";
import { useRef, useState } from "react";
import { useBookmarksContext } from "../../contexts/hooks";
import { useActiveJobTracking, useOnClickOutside } from "../../lib/hooks";

export default function BookmarksButton() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { bookmarkedJobs, isLoading } = useBookmarksContext();
    const [activeJob] = useActiveJobTracking();
    const sectionRef = useRef<HTMLElement>(null);

    const handlePopoverToggle = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    useOnClickOutside(sectionRef, () => setIsPopoverOpen(false));

    return (
        <section ref={sectionRef}>
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
