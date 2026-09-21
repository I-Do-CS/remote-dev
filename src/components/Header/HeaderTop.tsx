import BookmarksButton from "./Bookmarks/BookmarksButton";
import Logo from "./Logo";

export default function HeaderTop() {
    return (
        <div className="header__top">
            <Logo />
            <BookmarksButton />
        </div>
    );
}
