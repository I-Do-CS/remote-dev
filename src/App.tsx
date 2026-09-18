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
import { useActiveJobTracking, useDebounce, useJobs } from "./lib/hooks";
import { SEARCH_DELAY } from "./lib/constants";

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DELAY);
    const { jobs, isLoading: isJobsLoading } = useJobs(debouncedSearchTerm);
    const [activeJobDetail, isActiveJobDetailLoading] = useActiveJobTracking();

    const paginatedJobs = jobs.slice(0, 7);
    const totalJobs = jobs.length;

    return (
        <>
            <Background />

            <Header>
                <HeaderTop />
                <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </Header>

            <Container>
                <Sidebar>
                    <SidebarTop>
                        <ResultsCount totalJobs={totalJobs} />
                        <SortingControls />
                    </SidebarTop>
                    <JobsList
                        jobs={paginatedJobs}
                        isLoading={isJobsLoading}
                        activeJobId={activeJobDetail ? activeJobDetail.id : null}
                    />
                    <PaginationControls />
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
