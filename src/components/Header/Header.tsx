import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

type HeaderProps = {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
};

export default function Header({ searchTerm, setSearchTerm }: HeaderProps) {
    return (
        <header className="header">
            <div className="header__top">
                <Logo />
                <BookmarksButton />
            </div>

            <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
    );
}
