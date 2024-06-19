import React, { useEffect, useState } from "react";

import logo from "../static/logo.png";
import {
  getImagesURL,
  nowPlayingMoviesURL, onTheAirSeriesURL,
  popularMoviesURL, popularSeriesURL, topRatedMoviesURL, topRatedSeriesURL,
} from "../api/api";
import {
  TbHome,
  TbLogout,
  TbPlus,
  TbSettings2,
  TbStarFilled,
  TbVideo,
} from "react-icons/tb";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import {Link} from "react-router-dom";
import MediaCard from "../components/MediaCard";
import {getListsItems} from "../api/fetchData";
import ErrorMessage from "../components/ErrorMessage";
import {FiSearch} from "react-icons/fi";
import Modal from "../components/Modal";
import Search from "../components/Search";

function FeedPage() {

  // Constants
  const NUMBER_OF_CAROUSEL_SLIDES = 4;
  /* Current Feed
     .  0  => Movies
     .  1  => TV Series
   */
  const [currentFeed, setCurrentFeed] = useState(0)

  // Popular Items States
  const [popular, setPopular] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [errorPopular, setErrorPopular] = useState("");

  // Now Playing / On The Air Items
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);
  const [errorNowPlaying, setErrorNowPlaying] = useState("")

  // Top Rated Items
  const [topRated, setTopRated] = useState([]);
  const [loadingTopRated, setLoadingTopRated] = useState(true);
  const [errorTopRated, setErrorTopRated] = useState("")

  useEffect( () => {

    const DATA_URLs = {
      popular: currentFeed === 0 ? popularMoviesURL() : popularSeriesURL(),
      nowPlaying: currentFeed === 0 ? nowPlayingMoviesURL() : onTheAirSeriesURL(),
      topRated: currentFeed === 0 ? topRatedMoviesURL() : topRatedSeriesURL(),
    }

    // Fetching Popular Items
    fetchData(DATA_URLs.popular, setLoadingPopular, setErrorPopular, setPopular)
    // Fetching Top Rated Items
    fetchData(DATA_URLs.topRated, setLoadingTopRated, setErrorTopRated, setTopRated)
    // Fetching Now Playing Items
    fetchData(DATA_URLs.nowPlaying, setLoadingNowPlaying, setErrorNowPlaying, setNowPlaying)

  }, [currentFeed]);

 const fetchData = (url, setLoader, setError, setData) => {
   getListsItems(url).then((data) => {
     setData(data)
   }).catch(err => {
     setError(err.message)
     console.error(err)
   }).finally(() => {
     setLoader(false)
   })
 }

  // Auth
  const [logoutError, setLogoutError] = useState("")
  const {currentUser, logout} = useAuth()
  const handleLogout = async () => {
    setLogoutError("")
    try {
      await logout()
    } catch(err) {
      setLogoutError("Something wrong happened!")
    }
  }

  // Search Modal
  const [modal, viewModal] = useState(false);


  return (
    <main className="feed-page">
      <aside className="feed-page__side-nav">
        <img src={logo} alt="vertix logo" />
        <div className="feed-page__side-nav__menu">
          <h3>Menu</h3>
          <ul>
            <li>
              <TbHome />
              <span>Home</span>
            </li>
            <li>
              <TbVideo />
              <span>Coming Soon</span>
            </li>
          </ul>
        </div>
        <div className="feed-page__side-nav__options">
          <ul>
            <li>
              <TbSettings2 />
              <span>Settings</span>
            </li>
            <li onClick={handleLogout}>
              <TbLogout />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </aside>
      <section className="feed-page__main-content">
        {
          modal ? <Modal view={viewModal}><Search /></Modal> : <></>
        }
        <header className={"feed-page__main-content__header"}>
          <ul className={"feed-page__main-content__navigation"}>
            <li onClick={() => setCurrentFeed(0)} className={`feed-page__main-content__navigation__link ${currentFeed === 0 ? "active" : "" }`}>Movies</li>
            <li onClick={() => setCurrentFeed(1)} className={`feed-page__main-content__navigation__link ${currentFeed === 1 ? "active" : "" }`}>TV Series</li>
          </ul>

          <div className={"feed-page__main-content__search"}>
            <FiSearch onClick={() => viewModal(true)} />
          </div>
        </header>
        <div className={"feed-page__main-content__featured"}>
          {
            loadingNowPlaying ? <Loader/> :
                errorNowPlaying ? <ErrorMessage>{errorNowPlaying}</ErrorMessage> :
                    nowPlaying?.length > 0 ?
                        <Carousel list={nowPlaying.slice(0, NUMBER_OF_CAROUSEL_SLIDES)}/> :
                        <p>No Data.</p>
          }
        </div>
        <div className="feed-page__main-content__popular">
          <h1>Popular {currentFeed ?"Series" : "Movies"}</h1>
          <ul>
            {loadingPopular ? <Loader/> :
                errorPopular ? <ErrorMessage>{errorPopular}</ErrorMessage> :
                    popular?.length > 0 ?
                        popular?.slice(
                            0,
                            8
                        )
                            .map((movie) => (
                                <MediaCard mediaType={currentFeed === 0 ? "movie" : "tv"} key={movie.id} movie={movie}/>
                            )) : <center>No Data.</center>
            }
          </ul>
        </div>
      </section>
      <aside className="feed-page__side-content"></aside>
    </main>
  );
}

export default FeedPage;

function Carousel({list}) {

  const NUMBER_OF_CAROUSEL_SLIDES = list.length;
  const handelCircleClick = (e) => {
    const circleIndex = e.target.getAttribute("data-index");
    const carousel = document.querySelector(
        ".feed-page__main-content__featured__carousel"
    );

    // Toggle class name
    const circles = document.querySelectorAll(
        ".feed-page__main-content__featured__carousel-indicators__circle"
    );
    Array.from(circles).forEach((circle) => {
      circle.classList.remove("active");
    });
    e.target.classList.add("active");

    // Moving carousel
    carousel.style.left = `${-1 * 100 * circleIndex}%`;
  };
  return (
      <div>
      <div className="feed-page__main-content__featured__carousel">
        {list
            ?.slice(0, NUMBER_OF_CAROUSEL_SLIDES)
            .map((item, index) => (
                <CarouselCard key={index} item={item} index={{index}} />
            ))}
      </div>
      <div className="feed-page__main-content__featured__carousel-indicators">
        {Array(NUMBER_OF_CAROUSEL_SLIDES)
            .fill(0)
            .map((_, index) => (
                <span
                    key={index}
                    className={`feed-page__main-content__featured__carousel-indicators__circle ${
                        index === 0 ? "active" : ""
                    }`}
                    data-index={index}
                    onClick={handelCircleClick}
                ></span>
            ))}
      </div>
    </div>
)
}

function CarouselCard ({item, index}) {
  return (
      <div
          className="feed-page__main-content__featured__movie"
          key={item.id}
          style={{
            left: `${100 * index}%`,
          }}
      >
        <div className="feed-page__main-content__featured__movie__content">
          <img
              className="feed-page__main-content__featured__movie__banner"
              src={`${getImagesURL("original")}/${item.backdrop_path}`}
          />
          <div className="feed-page__main-content__featured__movie__info">
            <h3>{item.original_title || item.name}</h3>
            <div className="feed-page__main-content__featured__movie__actions">
              <button className="feed-page__main-content__featured__movie__actions__details">
                View Details
              </button>
              <button className="feed-page__main-content__featured__movie__actions__list">
                <TbPlus/>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
