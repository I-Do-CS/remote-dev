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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!searchTerm || searchTerm.trim() === "") return;
        async function fetchData() {
            setIsLoading(true);

            const response = await fetch(`${JOBS_BASE_URL}?search=${searchTerm}`);
            const data = await response.json();

            setIsLoading(false);
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
                    <JobList jobItems={jobItems} isLoading={isLoading} />
                    <PaginationControls />
                </Sidebar>
                <JobItemContent />
            </Container>

            <Footer />
        </>
    );
}

export default App;
