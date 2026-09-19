import { SortBy } from "../../../../lib/types";
import SortingControlButton from "./SortingControlButton";

type SortingControlsProps = {
    sortBy: SortBy;
    onSortChange: (newSortBy: SortBy) => void;
};

export default function SortingControls({ sortBy, onSortChange }: SortingControlsProps) {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onSortChange(event.currentTarget.value as SortBy);
        event.currentTarget.blur(); // Remove focus after clicking
    };

    return (
        <section className="sorting">
            <i className="fa-solid fa-arrow-down-short-wide"></i>

            <SortingControlButton
                isActive={sortBy === "relevant"}
                onClick={handleClick}
                value="relevant"
            />
            <SortingControlButton
                isActive={sortBy === "recent"}
                onClick={handleClick}
                value="recent"
            />
        </section>
    );
}
