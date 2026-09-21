import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import { useActiveJobTracking } from "../../../lib/hooks";
import { useBookmarkedJobDetails } from "../../../lib/hooks/app-specific";
import { useOnClickOutside } from "../../../lib/hooks/shared";

export default function BookmarksButton() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { bookmarkedJobDetails, isLoading } = useBookmarkedJobDetails();
    const [activeJob] = useActiveJobTracking();
    const sectionRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const handlePopoverToggle = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    useOnClickOutside([sectionRef, popoverRef], () => setIsPopoverOpen(false));

    return (
        <section ref={sectionRef}>
            <button className="bookmarks-btn" onClick={handlePopoverToggle}>
                Bookmarks <TriangleDownIcon />
            </button>

            {isPopoverOpen && (
                <BookmarksPopover
                    ref={popoverRef}
                    activeJobId={activeJob ? activeJob.id : null}
                    isLoading={isLoading}
                    jobs={bookmarkedJobDetails}
                />
            )}
        </section>
    );
}
