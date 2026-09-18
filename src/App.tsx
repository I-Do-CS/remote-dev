import {
    Background,
    Container,
    Footer,
    Header,
    HeaderTop,
    JobContent,
    JobsList,
    PaginationControls,
    SearchForm,
    Sidebar,
    SidebarTop,
} from "./components";
import { useState } from "react";
import { useJobs } from "./lib/hooks";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const { jobs, isLoading } = useJobs(searchTerm);

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
                    <JobsList jobs={jobs} isLoading={isLoading} />
                    <PaginationControls />
                </Sidebar>
                <JobContent />
            </Container>

            <Footer />
        </>
    );
}

export default App;
