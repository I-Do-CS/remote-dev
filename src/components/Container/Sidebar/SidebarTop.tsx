import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

export default function SidebarTop() {
    return (
        <div className="sidebar__top">
            <ResultsCount />
            <SortingControls />
        </div>
    );
}
