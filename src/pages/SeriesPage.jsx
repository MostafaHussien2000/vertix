/* React Hooks
============== */
import React, {useEffect, useState} from "react"
/* API URLs
=========== */
import {getImagesURL, getSeasonDataURL, getSeriesDataURL, options} from "../api/api";
/* React Icons
============== */
import {BiSolidQuoteLeft, BiSolidQuoteRight} from "react-icons/bi";
import {FaImdb} from "react-icons/fa";
import {TbArrowNarrowLeft, TbPlus, TbStarFilled} from "react-icons/tb";
import {FaHashtag} from "react-icons/fa6";
/* React Router DOM
=================== */
import {Link, useParams} from "react-router-dom";
/* Images
========= */
import imagePlaceholder from "../static/placeholder-image.webp"
/* React Components
=================== */
import MediaPageSkeletonLoader from "../components/loaders/MediaPageSkeletonLoader";
import ErrorMessage from "../components/ErrorMessage";

function SeriesPage () {
    const [series, setSeries] = useState({});
    const [loadingSeries, setLoadingSeries] = useState(true);
    const [errorSeries, setErrorSeries] = useState("");

    const [seasonNumber, setSeasonNumber ] = useState(1);
    const [selectedSeason, setSelectedSeason] = useState({});
    const [loadingSeason, setLoadingSeason] = useState(true);
    const [errorSeason, setErrorSeason] = useState("");

    const {seriesId} = useParams();


    useEffect( () => {
        fetch(getSeriesDataURL(seriesId), options())
            .then(response => {
                return response.json()
            }).then(data => {
                setSeries(data)
                setSeasonNumber(data?.seasons[0].season_number);
                //setSelectedSeason(data?.seasons[seasonNumber]);
            }).catch(err => {
                setErrorSeries("Something went wrong. Try reloading the page.");
                console.error(err)
            }).finally(() => {
                setLoadingSeries(false);
            })
    }, []);

    useEffect(() => {
        fetch(getSeasonDataURL(seriesId,seasonNumber), options())
            .then(response => response.json())
            .then(d => {
                setSelectedSeason(d);
               // console.log(d)
            }).catch(err => {
                setErrorSeason("Something went wrong");
                console.log(err);
        }).finally(() => {
            setLoadingSeason(false)
        })
    }, [seasonNumber]);

    if (loadingSeries) return <center><MediaPageSkeletonLoader /></center>
    if (errorSeries) return <center><ErrorMessage>{errorSeries}</ErrorMessage></center>
    return (
        <main className="series-page">
            <header className="series-page__header">
                <Link to={"/app/feed/tv"} className={"series-page__header__go-back"}>
                    <div className={"series-page__header__go-back__icon"}><TbArrowNarrowLeft /></div>
                    <p className={"series-page__header__go-back__text"}>Back to feed</p>
                </Link>
                <div className="series-page__header__banner">
                    <img src={`${getImagesURL("original")}/${series.backdrop_path}`} alt={series.name + " banner"}/>
                </div>
                <div className="series-page__header__content">
                    <h1>{series?.name}</h1>
                    {
                        series?.tagline ? (
                            <h5><BiSolidQuoteLeft /> {series?.tagline} <BiSolidQuoteRight /></h5>
                        ) : (
                            <></>
                        )
                    }
                    <div className="series-page__header__content__stats">
                        <p>{series?.number_of_seasons} {series?.number_of_seasons > 1 ? "Seasons" : "Season"}</p>
                        <p>|</p>
                        <p>{series?.first_air_date?.split("-")[0]}</p>
                        <p>|</p>
                        <p><FaImdb /> <span>{series?.vote_average?.toFixed(1)}</span></p>
                    </div>
                    <div className="series-page__header__actions">
                        <button>
                            <TbPlus/>
                            To Watchlist
                        </button>
                    </div>
                </div>
            </header>
            <div className="series-page__container">
                <section className="series-page__genres">
                    <h1 className="series-page__genres__heading">Genres</h1>
                    <div className="series-page__genres__items">
                        {
                            series?.genres?.map(item => (
                                <div className={"series-page__genres__items__item"}>
                                    <FaHashtag />
                                    <h4>{item.name}</h4>
                                </div>
                            ))
                        }
                    </div>
                </section>
                {
                    series?.overview ? (
                        <section className="series-page__overiew">
                            <h1 className="series-page__overiew__heading">Overview</h1>
                            <p className={"series-page__overview__paragraph"}>
                                {series?.overview}
                            </p>
                        </section>
                    ) : (
                        <></>
                    )

                }
                <section className="series-page__seasons">
                    <h1 className="series-page__seasons__heading">Seasons</h1>
                    <ul className="series-page__seasons__items">
                    {
                        series?.seasons.map((item, index) => (
                            <li
                                className={`series-page__seasons__items__item ${seasonNumber === item.season_number ? "active" : ""}`}
                                onClick={(e) => setSeasonNumber(item.season_number)}
                                key={index}
                            >
                                {item.name}
                            </li>
                        ))
                    }
                    </ul>
                    <SelectedSeasonDetailsSection season={selectedSeason} />
                </section>
                <section className="series-page__brought-by">
                    <h1  className="series-page__brought-by__heading">Brought to you by</h1>
                    <div className="series-page__brought-by__companies">
                    {
                        series?.production_companies?.map((company, index) => (
                            company?.logo_path ?
                                <img
                                    key={index}
                                    src={`${getImagesURL()}/${company.logo_path}`}
                                    alt={`${company.name} logo`}
                                /> : <p key={index}>{company.name}</p>
                        ))
                    }
                    </div>
                </section>
            </div>
        </main>
    )
}

export default SeriesPage;

function SelectedSeasonDetailsSection({season}) {

    const EPISODES_PER_VIEW = 10;
    const [viewedEpisodes, setViewedEpisodes] = useState(season?.episodes?.slice(0, EPISODES_PER_VIEW));


    const viewMoreEpisodes = () => {
        if (viewedEpisodes.length === season?.episodes?.length) return
        setViewedEpisodes((old) => [...old, ...season.episodes.slice(old.length, old.length + EPISODES_PER_VIEW)])
    }

    useEffect(() => {
        setViewedEpisodes(season?.episodes?.slice(0, EPISODES_PER_VIEW))
    }, [season]);

    return (
        <>
            <div className="series-page__seasons__season-details">
                <div className="series-page__seasons__season-details__poster">
                    <img src={`${getImagesURL()}/${season?.poster_path}`} alt={`${season?.name} poster`}/>
                </div>
                <div className="series-page__seasons__season-details__info">
                    <h3 className="series-page__seasons__season-details__info__title">{season?.name}</h3>
                    {
                        season?.vote_average ? (
                            <p className="series-page__seasons__season-details__info__rate">
                                <TbStarFilled />
                                {season?.vote_average?.toFixed(1)}
                            </p>
                        ) : (
                            <></>
                        )
                    }
                    <p className="series-page__seasons__season-details__info__overview">{season?.overview || "Sorry, no overview provided for this season."}</p>
                </div>
            </div>
            <div className="series-page__seasons__episodes">
                <h4 className="series-page__seasons__episodes__heading">Episodes <span> {season?.episodes?.length} </span></h4>
                <ul className="series-page__seasons__episodes__items">
                    {
                        viewedEpisodes?.length > 0 ?
                        viewedEpisodes?.map((episode, index) => <EpisodeCard key={index} episode={episode} />)
                            : <center><p className={"series-page__seasons__episodes__no-episodes"}></p></center>
                    }
                </ul>
                {
                    viewedEpisodes?.length < season?.episodes?.length ? (
                        <center>
                            <button
                                className={"series-page__seasons__episodes__view-more"}
                                onClick={viewMoreEpisodes}>View more episodes</button>
                        </center>
                    ) : <></>
                }
            </div>
        </>
    )
}

function EpisodeCard ({episode}) {
    return (
        <li className="series-page__seasons__episodes__items__card">
            <div className="series-page__seasons__episodes__items__card__banner">
                {
                    episode?.still_path ? (
                        <img src={`${getImagesURL()}/${episode?.still_path}`} alt={`Episode ${episode?.episode_number} banner.`}/>
                    ) : (
                        <img style={{opacity: 0.5}} src={imagePlaceholder} alt={`Episode ${episode?.episode_number} banner.`}/>
                    )
                }
                <span>#{episode?.episode_number}</span>
            </div >
            <h3 title={episode.name} className="series-page__seasons__episodes__items__card__title">{episode.name}</h3>
            <p className="series-page__seasons__episodes__items__card__rate">
                <TbStarFilled/>
                {episode.vote_average?.toFixed(1)}
            </p>
        </li>
    )
}

