import {
    Background,
    Container,
    Footer,
    Header,
    HeaderTop,
    JobItemContent,
    JobList,
    PaginationControls,
    SearchForm,
    Sidebar,
    SidebarTop,
} from "./components";
import { JOBS_BASE_URL } from "./lib/constants";
import { useEffect, useState } from "react";

function App() {
    const [jobItems, setJobItems] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchData() {
            if (searchTerm.trim() === "") return;

            const response = await fetch(`${JOBS_BASE_URL}?search=${searchTerm}`);
            const data = await response.json();
            setJobItems(data.jobItems);
        }

        fetchData();
    }, [searchTerm]);

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
                    <JobList jobItems={jobItems} />
                    <PaginationControls />
                </Sidebar>
                <JobItemContent />
            </Container>

            <Footer />
        </>
    );
}

export default App;
