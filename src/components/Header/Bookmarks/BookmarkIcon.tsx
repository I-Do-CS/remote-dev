import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkedJobIdsStore } from "../../../lib/stores/bookmarkedJobIdsStore";

type BookmarkIconProps = { id: number };

export default function BookmarkIcon({ id }: BookmarkIconProps) {
    const { bookmarkedJobIds, addBookmarkedJobId, removeBookmarkedJobId } =
        useBookmarkedJobIdsStore((state) => ({ ...state }));
    const isBookmarked = bookmarkedJobIds.includes(id);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        if (isBookmarked) {
            removeBookmarkedJobId(id);
        } else {
            addBookmarkedJobId(id);
        }
    };

    return (
        <button onClick={handleClick} className="bookmark-btn">
            <BookmarkFilledIcon className={`${isBookmarked && "filled"}`} />
        </button>
    );
}
