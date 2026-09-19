import { SortBy } from "../../../../lib/types";

type SortingControlButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    value: SortBy;
    isActive: boolean;
};

export default function SortingControlButton({
    isActive,
    onClick,
    value,
}: SortingControlButtonProps) {
    const activeStyle = "sorting__button--active";
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick(event);
    };

    return (
        <button
            onClick={handleClick}
            value={value}
            className={"sorting__button sorting__button--recent" + (isActive && ` ${activeStyle}`)}
        >
            {value[0].toLocaleUpperCase() + value.slice(1)}
        </button>
    );
}
