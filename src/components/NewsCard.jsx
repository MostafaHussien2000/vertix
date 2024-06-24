/* Images
========= */
import imagePlaceholder from "../static/placeholder-image.webp"
/* React Icons
============== */
import {TbBookmark} from "react-icons/tb";
function NewsCard ({item}) {
    console.log(item)
    return (
        <div className="news-card">
            <div className="news-card__banner">
                <img src={item?.urlToImage || imagePlaceholder} alt={item?.title}/>
                <button><TbBookmark /></button>
            </div>
            <div className="news-card__info">
                <h4>{item?.title}</h4>
            </div>
        </div>
    )
}

export default NewsCard;