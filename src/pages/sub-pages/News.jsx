/* React Hooks
============== */
import {useState, useEffect} from "react";
/* API URLs
=========== */
import {getNewsURL} from "../../api/api";
/* React Icons
============== */
import {LuDot} from "react-icons/lu";
/* React Components
=================== */
import NewsCard from "../../components/NewsCard";
import Loader from "../../components/loaders/Loader";

function News () {
    const [news, setNews] = useState({
        data: [],
        loading: true,
        error: ""
    })
    const [featuredItem, setFeaturedItem] = useState({})

    useEffect(() => {
        fetch(getNewsURL())
            .then(response => response.json())
            .then(data => {
                setNews(state => ({...state, data: data.articles.slice(1)}))
                setFeaturedItem(data.articles[0])
            })
            .catch(err => setNews(state => ({...state, error: "Something went wrong."})))
            .finally(() => setNews(state => ({...state, loading: false})));
    }, []);

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
                    ? `1 ${unit.name} ago`
                    : `${interval} ${unit.name}s ago`;
            }
        }
        return "just now";
    }

    if (news.loading) return <Loader />

    return (
        <div className="news">
            <div className="news__featured">
                <div className="news__featured__banner">
                    <img src={featuredItem?.urlToImage} alt={featuredItem?.title} />
                </div>
                <div className="news__featured__info">
                    <div className="news__featured__info__author">
                        <p>{featuredItem?.author}</p>
                        <LuDot />
                        <p>{getRelativeTime(featuredItem?.publishedAt)}</p>
                    </div>
                    <h1>{featuredItem?.title}</h1>
                    <p>{featuredItem?.description}</p>
                </div>
            </div>
            <h1>Latest News</h1>
            <div className="news__items">
                {
                    news.data.length > 0 ? news?.data?.map((item, index) => (
                        <NewsCard item={item} />
                    )) : <p>No news</p>
                }
            </div>
        </div>
    )
}

export default News;