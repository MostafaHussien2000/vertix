/* React Hooks
============== */
import {useState, useEffect} from "react"
/* React Components
=================== */
import Carousel from "../../components/Carousel";
import Skeleton from "../../components/loaders/Skeleton";
import Loader from "../../components/loaders/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import MediaCard from "../../components/MediaCard";
/* API URLs
=========== */
import {
    onTheAirSeriesURL,
    popularSeriesURL,
    topRatedSeriesURL
} from "../../api/api";
import { getListsItems } from "../../api/fetchData";

function TVShowsFeed() {
    const [popular, setPopular] = useState({
        data: [],
        loading: true,
        error: ""
    })
    const [nowPlaying, setNowPlaying] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [topRated, setTopRated] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const urls = {
        popular:  popularSeriesURL(),
        nowPlaying: onTheAirSeriesURL(),
        topRated: topRatedSeriesURL(),
    }
    useEffect(() => {
        fetchData(urls.popular, setPopular)
        fetchData(urls.nowPlaying, setNowPlaying)
        fetchData(urls.topRated, setTopRated)
    }, [])
    const fetchData = (url, setter) => {
        getListsItems(url).then((data) => {
            setter(state => ({...state, data: data.slice(0, 4)}))
        }).catch(err => {
            setter(state => ({...state, error: err.message}))
            console.error(err)
        }).finally(() => {
            setter(state => ({...state, loading: false}))
        })
    }
    return (
        <>
            {
                nowPlaying.loading ?
                    <Skeleton type={"featuredMedia"} /> :
                    nowPlaying.error ?
                        <ErrorMessage></ErrorMessage> :
                        <Carousel mediaType={"tv"} items={nowPlaying.data.slice(0, 5)}/>
            }
            <div className={"feed__category"}>
                <h1 className={"feed__category__heading"}>Popular TV Shows</h1>
                {
                    popular.loading ?
                        (
                            <div className={"feed__category__items"}>
                                <Skeleton type={"mediaCard"}/>
                                <Skeleton type={"mediaCard"}/>
                                <Skeleton type={"mediaCard"}/>
                                <Skeleton type={"mediaCard"}/>
                            </div>
                        ):
                        popular.error ?
                            <ErrorMessage></ErrorMessage> :
                            (
                                <>
                                    {
                                        popular.data?.length === 0 ?
                                            <center className={"no-items"}>
                                                <p>No tv shows available now for this section.</p>
                                            </center> :
                                            <div className="feed__category__items">
                                                {
                                                    popular.data?.map((item, index) =>
                                                        <MediaCard key={index} mediaType={"tv"} movie={item}/>
                                                    )
                                                }
                                            </div>

                                    }
                                </>
                            )
                }
            </div>
            <div className={"feed__category"}>
                <h1 className={"feed__category__heading"}>Top Rated TV Shows</h1>
                {
                    topRated.loading ?
                        (
                            <div className={"feed__category__items"}>
                                <Skeleton type={"mediaCard"}/>
                                <Skeleton type={"mediaCard"}/>
                                <Skeleton type={"mediaCard"}/>
                                <Skeleton type={"mediaCard"}/>
                            </div>
                        ):
                        topRated.error ?
                            <ErrorMessage></ErrorMessage> :
                            (
                                <>
                                    {
                                        topRated.data?.length === 0 ?
                                            <center className={"no-items"}>
                                                <p>No tv shows available now for this section.</p>
                                            </center> :
                                            <div className="feed__category__items">
                                                {
                                                    topRated.data?.map((item, index) =>
                                                        <MediaCard key={index} mediaType={"tv"} movie={item}/>
                                                    )
                                                }
                                            </div>

                                    }
                                </>
                            )
                }
            </div>
        </>
    )
}

export default TVShowsFeed;