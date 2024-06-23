/* Images
========= */
import logo from "../static/logo.png"
import banner from "../static/home-page-banner.png"
/* React Router DOM
=================== */
import {Link} from "react-router-dom";
/* Icons
======== */
import {TbArrowNarrowLeft, TbArrowNarrowRight, TbPlus, TbShieldLock} from "react-icons/tb";
import { HiOutlineArrowNarrowRight, HiOutlineViewGridAdd } from "react-icons/hi";
import { HiCubeTransparent   } from "react-icons/hi2";
import {GiCardAceHearts, GiClown, GiCrossedPistols, GiDramaMasks} from "react-icons/gi";
import {RiCriminalFill} from "react-icons/ri";
import {FaBook} from "react-icons/fa6";
import {MdFamilyRestroom} from "react-icons/md";
/* Slick Slider
=============== */
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/* React Hooks
============== */
import {useState, useEffect} from "react";
/* API URLs
=========== */
import {getImagesURL, options, popularMoviesURL} from "../api/api";
import mediaCard from "../components/MediaCard";
import Loader from "../components/loaders/Loader";

function LandingPage() {

    const genres = [
        {
            idForMovies: 28,
            idForTV: 10759,
            name: "Action",
            icon: () => <GiCrossedPistols />
        },
        {
            idForMovies: 16,
            idForTV: 16,
            name: "Animation",
            icon: () => <GiCardAceHearts />
        },
        {
            idForMovies: 35,
            idForTV: 35,
            name: "Comedy",
            icon: () => <GiClown />
        },
        {
            idForMovies: 80,
            idForTV: 80,
            name: "Crime",
            icon: () => <RiCriminalFill />
        },
        {
            idForMovies: 99,
            idForTV: 99,
            name: "Documentary",
            icon: () => <FaBook />
        },{
            idForMovies: 10751,
            idForTV: 10751,
            name: "Family",
            icon: () => <MdFamilyRestroom />
        },
        {
            idForMovies: 18,
            idForTV: 18,
            name: "Drama",
            icon: () => <GiDramaMasks />
        },
    ]

    const [popular, setPopular] = useState({
        data: [],
        loading: true,
        error: ""
    })

    useEffect(() => {
        fetch(popularMoviesURL(false, false, 1), options())
            .then(response => response.json())
            .then(data => setPopular(state => ({...state, data: data.results.slice(0, 8)})))
            .catch(err => setPopular((state) => ({...state, error: "Something is wrong."})))
            .finally(() => setPopular(state=>({...state, loading: false})))
    }, [])

    return (
        <main className="landing-page">
            <nav className="landing-page__nav">
                <div className="landing-page__nav__logo">
                    <img src={logo} alt={"Vertix logo"} />
                </div>
                <div className="landing-page__nav__actions">
                    <Link onClick={() => console.log("link clicked")} to={"/login"} className="landing-page__nav__actions__login">Login</Link>
                </div>
            </nav>
            <header className="landing-page__header">
                <img className="landing-page__header__banner" src={banner} alt={"home page banner"} />
                <div className="landing-page__header__text">
                    <p>Your place to organize what you wanna see most.</p>
                </div>
                <div className="landing-page__header__actions">
                    <button className="landing-page__header__actions__add">
                       <TbPlus /> Start a new list
                    </button>
                </div>
                <p className={"landing-page__header__learn-more"} onClick={() => {
                    console.log("clicked")
                    const scrollY = window.innerHeight
                    window.scroll({
                        top: window.innerHeight + 10,
                        left: 0,
                        behavior: "smooth"
                    })
                }}>Learn More <HiOutlineArrowNarrowRight /></p>
            </header>
            <div className="landing-page__container">
                <section className={"landing-page__why-us"}>
                    <div className={"landing-page__why-us__text"}>
                        <h1>Why choose <br/><span>Vertix</span> ?</h1>
                        <p>
                            Vertix offers a comprehensive and user-friendly platform for movie enthusiasts to manage and
                            enjoy their movie collections. With secure storage, seamless integration, and a host of
                            personalized features, Vertix is the ultimate tool for keeping track of your cinematic
                            adventures.
                        </p>
                    </div>
                    <div className={"landing-page__why-us__features"}>
                        <div className={"landing-page__why-us__features__box"}>
                            <HiOutlineViewGridAdd/>
                            <h4>Personalized<br/>experience</h4>
                        </div>
                        <div className={"landing-page__why-us__features__box"}>
                            <TbShieldLock/>
                            <h4>Secure sessions<br/>& data</h4>
                        </div>
                        <div className={"landing-page__why-us__features__box"}>
                            <HiCubeTransparent/>
                            <h4>Seamless movies<br/>feed</h4>
                        </div>
                        <div className={"landing-page__why-us__features__box action"}>
                            <h4>Start now.</h4>
                        </div>
                    </div>
                </section>
            </div>
            {
                popular.loading ? (
                    <Loader />
                ) : popular.error ? (
                    <p>{popular.error}</p>
                ) : popular?.data?.length === 0 ? (
                    <></>
                ) : (
                    <div className="landing-page__popular-movies">
                        <center className="landing-page__popular-movies__heading">
                        <h1>Popular Movies</h1>
                        <p>The most popular movies in {new Date().getFullYear()}</p>
                        </center>
                        <PopularMoviesCarousel items={popular?.data} />
                    </div>
                )
            }
            <div className="landing-page__container">
                <section className="landing-page__genres">
                    <div className="landing-page__genres__heading">
                        <h1>Find your favourite movie genres</h1>
                        <p>We also provide moves with various genre categories that you can find here, choose the
                            genre you like</p>
                    </div>
                    <div className="landing-page__genres__items">
                        {
                            genres.map((item, index) => (
                                <div key={index} className={"landing-page__genres__items__item"}>
                                    {item.icon()}
                                    <h4>{item.name}</h4>
                                </div>
                            ))
                        }
                        <div className={"landing-page__genres__items__item action"}>
                            Discover more.
                        </div>
                    </div>
                </section>
            </div>
            <footer className={"landing-page__footer"}>
                    All rights are reserved©. Created by Mostafa Hussien.
            </footer>
        </main>
    )
}

export default LandingPage;

function PopularMoviesCarousel ({items}) {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 5 slides at a time
        slidesToScroll: 1, // Scroll one slide at a time
        centerMode: true, // Centers the active slide
        centerPadding: '0', // No padding around the centered slide
        focusOnSelect: true, // Focus on the selected slide
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            {
                items?.map((item => <MovieCard item={item}/>))
            }
        </Slider>
    )
}
function MovieCard({item}) {
    return (
        <div className="landing-page__popular-movies__movie-card">
            <div className="landing-page__popular-movies__movie-card__banner">
                <img
                    src={`${getImagesURL("original")}/${item?.backdrop_path}`}
                    alt={`${item?.title} banner`}
                />
            </div>
            <center className="landing-page__popular-movies__movie-card__content">
                <img
                    src={`${getImagesURL("original")}/${item?.poster_path}`}
                    alt={`${item?.title} banner`}
                    className="landing-page__popular-movies__movie-card__poster"
                />
                <h4 className="landing-page__popular-movies__movie-card__title">{item?.title}</h4>
                <p className="landing-page__popular-movies__movie-card__overview">{item?.vote_average?.toFixed(1)}</p>
                <p className="landing-page__popular-movies__movie-card__overview">{item?.overview}</p>
                <div className="landing-page__popular-movies__movie-card__actions">
                    <button title={"add to watchlist"} type={"button"} className={"landing-page__popular-movies__movie-card__watchlist"}>Add to watchlist</button>
                    <Link to={`/movie/${item?.id}`} title={"view details page"} type={"button"} className={"landing-page__popular-movies__movie-card__details"}>View Details</Link>
                </div>
            </center>
        </div>
    )
}

function NextArrow ({onClick}) {
    return (
        <button title={"next movie"} type={"button"} onClick={onClick} className="landing-page__popular-movies__arrow next-arrow">
            <TbArrowNarrowRight />
        </button>
    )
}
function PrevArrow ({onClick}) {
    return (
        <button title={"previous movie"} type={"button"} onClick={onClick} className="landing-page__popular-movies__arrow prev-arrow">
            <TbArrowNarrowLeft />
        </button>
    )
}
