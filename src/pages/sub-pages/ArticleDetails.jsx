/* React Icons
============== */
import {TbArrowNarrowLeft, TbBookmark, TbShare2} from "react-icons/tb";
import {LuDot} from "react-icons/lu";
/* Images
========= */
import imagePlaceholder from "../../static/placeholder-image.webp"
/* DOMPurify
============ */
import DOMPurify from 'dompurify';

function ArticleDetails ({selectedArticle: article, setSelectedArticle}) {
    const formatDate = (dateString) => {
        if (!dateString) return;
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    const sanitizedContent = DOMPurify.sanitize(`<div>
    <ul>
        <li>list item content</li>
        <li>list item content</li>
        <li>list item content</li>
    </ul>
</div>  `, { USE_PROFILES: { html: true } });
    console.log(sanitizedContent)

    return (
        <main className="article-details">
            <div className={"article-details__go-back"} onClick={() => setSelectedArticle({})}>
                <div className={"series-page__header__go-back__icon"}><TbArrowNarrowLeft /></div>
                <p className={"series-page__header__go-back__text"}>Back to feed</p>
            </div>
            <header className={"article-details__header"}>
                <div className="article-details__header__data">
                    <p>{article?.author}</p>
                    <LuDot/>
                    <p>{formatDate(article?.publishedAt)}</p>
                </div>
                <div className="article-details__header__actions">
                    <button type={"button"} title={"Share Article."} className="article-details__header__actions__share"><TbShare2 /></button>
                    <button type={"button"} title={"Save Article."} className="article-details__header__actions__save"><TbBookmark /></button>
                </div>
            </header>
            <h1 className="article-details__title">{article?.title}</h1>
            <div className="article-details__banner">
                <img src={article?.urlToImage || imagePlaceholder} alt={article?.title}/>
            </div>
            <div className="article-details__content" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
        </main>
    );
}

export default ArticleDetails;

