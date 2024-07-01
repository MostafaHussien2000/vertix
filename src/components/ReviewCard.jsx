import {getImagesURL} from "../api/api";
/* Images
========= */
import imagePlaceholder from "../static/profile-placeholder.jpeg"
/* React Icons
============== */
import {TbStarFilled} from "react-icons/tb";

function ReviewCard({review}) {
    const formatDate = (date) => {
        const originalDate = new Date(date);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const day = originalDate.getUTCDate();
        const month = months[originalDate.getUTCMonth()];
        const year = originalDate.getUTCFullYear();

        return `${day}, ${month} ${year}`;
    }
    const renderReviewText = (reviewText) => {
        const htmlContent = reviewText.replace(/\\r\\n/g, '<br>');
        return { __html: htmlContent };
    };
    return (
        <div className="review-card">
            <div className="review-card__header">
                <span className="review-card__header__rating">
                    {
                        review?.author_details?.rating ?
                            <>
                                <TbStarFilled /> { review?.author_details?.rating }
                            </>
                             : ""
                    }
                </span>
                <span className="review-card__header__date">{formatDate(review?.created_at)}</span>
            </div>
            <div className="review-card__review">
                <p dangerouslySetInnerHTML={renderReviewText(review?.content)}></p>
            </div>
            <div className="review-card__user-info">
                <div className="review-card__user-info__profile-pic">
                    <img
                        src={
                            review?.author_details?.avatar_path ?
                                `${getImagesURL("w500")}/${review?.author_details?.avatar_path}` :
                                imagePlaceholder
                        }
                        alt={`${review?.author_details?.name} profile pic.`}/>
                </div>
                <div className="review-card__user-info__name">
                    <h4>{review?.author_details?.name || "Unknown User"}</h4>
                    <p>@{review?.author_details?.username}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard;