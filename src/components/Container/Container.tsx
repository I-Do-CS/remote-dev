import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar/Sidebar";

export default function Container() {
    return (
        <div className="container">
            <Sidebar />
            <JobItemContent />
        </div>
    );
}
