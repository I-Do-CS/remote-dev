import BookmarkIcon from "../../Misc/BookmarkIcon";

type JobListItemProps = {
    item: Job;
    isActive: boolean;
};

export default function JobsListItem({ item, isActive }: JobListItemProps) {
    return (
        <li className={"job-item" + (isActive && " job-item--active")}>
            <a href={`#${item.id.toString()}`} className="job-item__link">
                <div className="job-item__badge">{item.badgeLetters}</div>

                <div className="job-item__middle">
                    <h3 className="third-heading">{item.title}</h3>
                    <p className="job-item__company">{item.company}</p>
                </div>

                <div className="job-item__right">
                    <BookmarkIcon id={item.id} />
                    <time className="job-item__time">
                        {item.daysAgo <= 0 ? "Today" : `${item.daysAgo}d`}
                    </time>
                </div>
            </a>
        </li>
    );
}
