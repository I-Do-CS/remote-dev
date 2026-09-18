import {
    Background,
    Container,
    Footer,
    Header,
    HeaderTop,
    JobDetailContainer,
    JobsList,
    PaginationControls,
    SearchForm,
    Sidebar,
    SidebarTop,
} from "./components";
import { useState } from "react";
import { useActiveJobTracking, useJobs } from "./lib/hooks";

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [jobs, isJobsLoading] = useJobs(searchTerm);
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
                    <SidebarTop />
                    <JobsList
                        jobs={jobs}
                        isLoading={isJobsLoading}
                        activeJobId={activeJobDetail?.id}
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
