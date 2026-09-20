import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../../contexts/hooks";

type BookmarkIconProps = { id: number };

export default function BookmarkIcon({ id }: BookmarkIconProps) {
    const { bookmarkedIds, handleBookmarkToggle } = useBookmarksContext();
    const isBookmarked = bookmarkedIds.includes(id);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        handleBookmarkToggle(id);
    };

    return (
        <button onClick={handleClick} className="bookmark-btn">
            <BookmarkFilledIcon className={`${isBookmarked && "filled"}`} />
        </button>
    );
}
