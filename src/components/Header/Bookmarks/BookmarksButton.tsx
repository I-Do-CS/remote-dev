import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { useActiveJobTracking } from "../../../lib/hooks";
import { useBookmarkedJobDetails } from "../../../lib/hooks/app-specific";
import { useOnClickOutside } from "../../../lib/hooks/shared";
import BookmarksPopover from "./BookmarksPopover";

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
                    popoverRef={popoverRef}
                    activeJobId={activeJob ? activeJob.id : null}
                    isLoading={isLoading}
                    jobs={bookmarkedJobDetails}
                />
            )}
        </section>
    );
}
