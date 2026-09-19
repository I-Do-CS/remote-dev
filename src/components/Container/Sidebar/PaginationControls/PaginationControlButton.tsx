import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlButtonProps = {
    onPageChange: (direction: "next" | "previous") => void;
    direction: "next" | "previous";
    currentPage: number;
    totalPages: number;
};

export default function PaginationControlButton({
    currentPage,
    totalPages,
    direction,
    onPageChange,
}: PaginationControlButtonProps) {
    const page = currentPage + (direction === "next" ? 1 : -1);
    const disabled = page > totalPages || page <= 0;

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onPageChange(direction);
        event.currentTarget.blur(); // Remove focus from button after click
    }

    return (
        <button
            disabled={disabled}
            className={"pagination__button " + `pagination__button--${direction}`}
            onClick={handleClick}
        >
            {direction === "previous" && <ArrowLeftIcon />}
            Page {page}
            {direction === "next" && <ArrowRightIcon />}
        </button>
    );
}
