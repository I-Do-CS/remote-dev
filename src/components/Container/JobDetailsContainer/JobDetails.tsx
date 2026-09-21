import BookmarkIcon from "../../Misc/BookmarkIcon";
import officeImageURL from "../../../assets/images/office-view.jpg";

type JobDetailsProps = {
    jobDetails: JobDetails;
};

export default function JobDetails({ jobDetails }: JobDetailsProps) {
    return (
        <>
            <img src={jobDetails.coverImgURL ?? officeImageURL} alt="#" />
            <a className="apply-btn" href={jobDetails.companyURL} target="_blank">
                Apply
            </a>
            <section className="job-info">
                <div className="job-info__left">
                    <div className="job-info__badge">{jobDetails.badgeLetters}</div>
                    <div className="job-info__below-badge">
                        <time className="job-info__time">
                            {jobDetails.daysAgo <= 0 ? "Today" : `${jobDetails.daysAgo}d`}
                        </time>

                        <BookmarkIcon id={jobDetails.id} />
                    </div>
                </div>

                <div className="job-info__right">
                    <h2 className="second-heading">{jobDetails.title}</h2>
                    <p className="job-info__company">{jobDetails.company}</p>
                    <p className="job-info__description">{jobDetails.description}</p>
                    <div className="job-info__extras">
                        <p className="job-info__extra">
                            <i className="fa-solid fa-clock job-info__extra-icon"></i>
                            {jobDetails.duration}
                        </p>
                        <p className="job-info__extra">
                            <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                            {jobDetails.salary}
                        </p>
                        <p className="job-info__extra">
                            <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                            {jobDetails.location}
                        </p>
                    </div>
                </div>
            </section>
            <div className="job-details__other">
                <section className="qualifications">
                    <div className="qualifications__left">
                        <h4 className="fourth-heading">Qualifications</h4>
                        <p className="qualifications__sub-text">Other qualifications may apply</p>
                    </div>
                    <ul className="qualifications__list">
                        {jobDetails.qualifications.map((qualification) => (
                            <li key={qualification} className="qualifications__item">
                                {qualification}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="reviews">
                    <div className="reviews__left">
                        <h4 className="fourth-heading">Company reviews</h4>
                        <p className="reviews__sub-text">Recent things people are saying</p>
                    </div>
                    <ul className="reviews__list">
                        {jobDetails.reviews.map((review) => (
                            <li key={review} className="reviews__item">
                                {review}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            <footer className="job-details__footer">
                <p className="job-details__footer-text">
                    If possible, please reference that you found the job on{" "}
                    <span className="u-bold">rmtDev</span>, we would really appreciate it!
                </p>
            </footer>
        </>
    );
}
