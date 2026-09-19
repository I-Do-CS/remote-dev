import PaginationControlButton from "./PaginationControlButton";

type PaginationControlsProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (direction: "next" | "previous") => void;
};

export default function PaginationControls({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationControlsProps) {
    return (
        <section className="pagination">
            {currentPage - 1 > 0 && (
                <PaginationControlButton
                    currentPage={currentPage}
                    direction="previous"
                    onPageChange={onPageChange}
                    totalPages={totalPages}
                />
            )}
            {currentPage + 1 <= totalPages && (
                <PaginationControlButton
                    currentPage={currentPage}
                    direction="next"
                    onPageChange={onPageChange}
                    totalPages={totalPages}
                />
            )}
        </section>
    );
}
