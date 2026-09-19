import {
    Background,
    Container,
    Footer,
    Header,
    HeaderTop,
    JobDetailContainer,
    JobsList,
    PaginationControls,
    ResultsCount,
    SearchForm,
    Sidebar,
    SidebarTop,
    SortingControls,
} from "./components";
import { useState } from "react";
import {
    useActiveJobTracking,
    useDebounce,
    useJobs,
    usePaginatedJobs,
    useResettableState,
} from "./lib/hooks";
import { PAGINATION_PAGESIZE, SEARCH_DELAY } from "./lib/constants";
import { Toaster } from "react-hot-toast";
import { SortBy } from "./lib/types";

export default function App() {
    // Search term for jobs
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DELAY);

    // Sorting
    const [sortBy, setSortBy] = useState<SortBy>("relevant");
    const handleSortChange = (newSortBy: SortBy) => {
        setSortBy(newSortBy);
    };
    
    // Jobs
    const { jobs, isLoading: isJobsLoading } = useJobs(debouncedSearchTerm, sortBy);
    const [activeJobDetail, isActiveJobDetailLoading] = useActiveJobTracking();

    // Pagination
    // Resets pagination every time the user queries new data
    const [currentPage, setCurrentPage] = useResettableState(1, [debouncedSearchTerm, sortBy]);
    const { paginatedJobs, totalPages } = usePaginatedJobs(currentPage, PAGINATION_PAGESIZE, jobs);
    const totalJobs = jobs.length;
    const handlePageChange = (direction: "next" | "previous") => {
        if (direction === "next") {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        } else if (direction === "previous") {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        }
    };

    return (
        <>
            <Background />

            <Toaster position="top-right" />

            <Header>
                <HeaderTop />
                <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </Header>

            <Container>
                <Sidebar>
                    <SidebarTop>
                        <ResultsCount totalJobs={totalJobs} />
                        <SortingControls sortBy={sortBy} onSortChange={handleSortChange} />
                    </SidebarTop>
                    <JobsList
                        jobs={paginatedJobs}
                        isLoading={isJobsLoading}
                        activeJobId={activeJobDetail ? activeJobDetail.id : null}
                    />
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Sidebar>
                <JobDetailContainer
                    jobDetail={activeJobDetail}
                    isLoading={isActiveJobDetailLoading}
                />
            </Container>

            <Footer />
        </>
    );
}
