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
import { useActiveJobTracking, useJobs } from "./lib/hooks";

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const { paginatedJobs: jobs, isLoading: isJobsLoading, totalJobs } = useJobs(searchTerm);
    const [activeJobDetail, isActiveJobDetailLoading] = useActiveJobTracking();

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
                        jobs={jobs}
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
