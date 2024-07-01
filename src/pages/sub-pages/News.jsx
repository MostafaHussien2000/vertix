/* React Hooks
============== */
import {useState, useEffect, useRef, useCallback} from "react";
/* API URLs
=========== */
import {getNewsURL} from "../../api/api";
/* React Icons
============== */
import {LuDot} from "react-icons/lu";
import {TbArrowNarrowUp} from "react-icons/tb";
/* React Components
=================== */
import ArticleCard from "../../components/ArticleCard";
import Skeleton from "../../components/loaders/Skeleton";

function News ({setSelectedArticle}) {
    const [news, setNews] = useState({
        data: [],
        loading: true,
        error: "",
        buffer: [],
    })
    const [featuredItem, setFeaturedItem] = useState({})

    // Infinite Scroll Logic
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (!hasMore) return;
        fetch(getNewsURL(page))
            .then(response => response.json())
            .then(data => {
                setNews(state => ({...state, data: [...news.data, ...data?.articles?.slice(page === 1 ? 1 : 0)]}))
                if (page === 1 ) setFeaturedItem(data.articles[0])
                if (news.data.length >= 80) setHasMore(false)
            })
            .catch(err => setNews(state => ({...state, error: "Something went wrong."})))
            .finally(() => setNews(state => ({...state, loading: false})));
    }, [page, hasMore]);

    // Getting relative time
    const getRelativeTime = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInSeconds = Math.floor((now - past) / 1000);

        const units = [
            { name: "year", seconds: 31536000 },
            { name: "month", seconds: 2592000 },
            { name: "week", seconds: 604800 },
            { name: "day", seconds: 86400 },
            { name: "hour", seconds: 3600 },
            { name: "minute", seconds: 60 },
            { name: "second", seconds: 1 }
        ];

        for (const unit of units) {
            const interval = Math.floor(diffInSeconds / unit.seconds);
            if (interval >= 1) {
                return interval === 1
                    ? `1 ${unit.name} ago.`
                    : `${interval} ${unit.name}s ago.`;
            }
        }
        return "just now.";
    }

    return (
        <div className="news">
            <center><h1>Box Office 🍿</h1></center>
            {
                news?.loading ? <Skeleton type={"featuredArticle"} /> : (
                    <div className="news__featured">
                        <div className="news__featured__banner">
                            <img src={featuredItem?.urlToImage} alt={featuredItem?.title}/>
                        </div>
                        <div className="news__featured__info">
                            <div className="news__featured__info__author">
                                <p>{featuredItem?.author}</p>
                                <LuDot/>
                                <p>{getRelativeTime(featuredItem?.publishedAt)}</p>
                            </div>
                            <h1>{featuredItem?.title}</h1>
                            <p>{featuredItem?.description}</p>
                        </div>
                    </div>
                )
            }
            <h1>Latest News</h1>
            <NewsFeed setSelectedArticle={setSelectedArticle} loading={news?.loading} news={news?.data} error={news?.error} setPage={setPage} hasMore={hasMore}/>
        </div>
    )
}

export default News;

function NewsFeed ({news, loading, hasMore, setPage, setSelectedArticle}) {
    const observer = useRef();

    const lastArticleElement = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(i => i + 1)
                };
            })
            if (node) observer.current.observe(node)
        }
    , [loading, hasMore])
    return (
        <>
            <div className="news__items">
                { loading ? <></> :
                    news.length > 0 ? news?.map((item, index) => (
                        <>
                            {
                                news.length === index + 1 ?
                                    <div key={index} ref={lastArticleElement}>
                                        <ArticleCard setSelectedArticle={setSelectedArticle} item={item}/>
                                    </div> :
                                    <ArticleCard setSelectedArticle={setSelectedArticle} key={index} item={item} />
                            }
                        </>
                    )) : <p>No news</p>
                }
                {
                    hasMore ? (
                        <>
                            <Skeleton type={"articleCard"}/>
                            <Skeleton type={"articleCard"}/>
                            <Skeleton type={"articleCard"}/>
                        </>
                    ) : (
                        <></>
                    )
                }
            </div>
            {
                !hasMore ? (
                    news.length > 0 ? (
                        <p className={"end-of-items"}>No more articles.
                            {" "}
                            <span
                                onClick={() =>
                                    window.scrollTo({top: 0, behavior:"smooth"})
                                }>
                                Scroll to the top. <TbArrowNarrowUp />
                            </span>
                        </p>
                    ) : (
                        <p className={"end-of-items"}>No articles found.</p>
                    )
                ) : (
                    <></>
                )
            }
        </>
    )
}