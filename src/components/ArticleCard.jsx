/* Images
========= */
import imagePlaceholder from "../static/placeholder-image.webp"
/* React Icons
============== */
import {TbBookmark} from "react-icons/tb";
/* React Router DOM
=================== */
import { Link } from "react-router-dom";
function ArticleCard ({item, setSelectedArticle}) {
    const articleId = item.url.split("/").slice(-1)[0] || item.url.split("/").slice(-2)[0]
    return (
        <div className="news-card">
            <div className="news-card__banner">
                <img src={item?.urlToImage || imagePlaceholder} alt={item?.title}/>
                <button><TbBookmark /></button>
            </div>
            <div className="news-card__info">
                <h4 onClick={() => setSelectedArticle(item)}>{item?.title}</h4>
                <p>{item?.source?.name || ""}</p>
            </div>
        </div>
    )
}

export default ArticleCard;