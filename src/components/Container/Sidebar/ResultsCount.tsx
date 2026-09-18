type ResultsCountProps = {
    totalJobs: number;
};

export default function ResultsCount({ totalJobs }: ResultsCountProps) {
    return (
        <p className="count">
            <span className="u-bold">{totalJobs}</span> results
        </p>
    );
}
