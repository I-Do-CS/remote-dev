type SearchFormProps = {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
};

export default function SearchForm({ searchTerm, setSearchTerm }: SearchFormProps) {
    return (
        <form onSubmit={handleSubmit} action="#" className="search">
            <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <input
                value={searchTerm}
                spellCheck="false"
                type="text"
                required
                placeholder="Find remote developer jobs..."
                onChange={handleInputChange}
            />
        </form>
    );

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
    }
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }
}
