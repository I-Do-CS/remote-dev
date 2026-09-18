import { useEffect, useState } from "react";
import { Background, Container, Footer, Header } from "./components";
import { JOBS_BASE_URL } from "./lib/constants";

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

            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <Container jobItems={jobItems} />

            <Footer />
        </>
    );
}

export default App;
