import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar/Sidebar";

type ContainerProps = {
    jobItems: Job[];
};

export default function Container({ jobItems }: ContainerProps) {
    return (
        <div className="container">
            <Sidebar jobItems={jobItems} />
            <JobItemContent />
        </div>
    );
}
