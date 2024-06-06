import React, { useEffect, useState } from "react";

import logo from "../static/logo.png";
import {
  getImagesURL,
  nowPlayingMoviesURL,
  popularMoviesURL,
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

function FeedPage() {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(nowPlayingMoviesURL())
      .then((response) => response.json())
      .then((data) => {
        setMovies((m) => ({ ...m, nowPlaying: data.results }));
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        throw new Error(err);
      });
  }, []);

  const userDate = {
    userName: "John Doe",
    email: "john@mail.com",
    profilePic:
      "https://th.bing.com/th/id/OIP.4A2g1d0ruPQwtDlpBl5OuQHaHZ?rs=1&pid=ImgDetMain",
  };

  // Carousel Functionality
  const NUMBER_OF_CAROUSEL_SLIDES = 4;
  const [currentSlide, setCurrentSlide] = useState(0);

  const handelCircleClick = (e) => {
    const circleIndex = e.target.getAttribute("data-index");
    const carousel = document.querySelector(
      ".feed-page__main-content__featured__carousel"
    );
    const slides = carousel.querySelectorAll(
      ".feed-page__main-content__featured__movie"
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
            <li>
              <TbLogout />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </aside>
      <section className="feed-page__main-content">
        {loading ? (
          <center>
            <Loader />
          </center>
        ) : error ? (
          <p>something went wrong</p>
        ) : movies ? (
          <>
            <div className="feed-page__main-content__featured">
              <div className="feed-page__main-content__featured__carousel">
                {movies?.nowPlaying
                  ?.slice(0, NUMBER_OF_CAROUSEL_SLIDES)
                  .map((movie, index) => (
                    <div
                      className="feed-page__main-content__featured__movie"
                      key={movie.id}
                      style={{
                        left: `${100 * index}%`,
                      }}
                    >
                      <div className="feed-page__main-content__featured__movie__content">
                        <img
                          className="feed-page__main-content__featured__movie__banner"
                          src={`${getImagesURL()}/${movie.backdrop_path}`}
                        />
                        <div className="feed-page__main-content__featured__movie__info">
                          <h3>{movie.original_title}</h3>
                          <div className="feed-page__main-content__featured__movie__actions">
                            <button className="feed-page__main-content__featured__movie__actions__details">
                              View Details
                            </button>
                            <button className="feed-page__main-content__featured__movie__actions__list">
                              <TbPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
            <div className="feed-page__main-content__popular">
              <h1>Popular Movies</h1>
              <ul>
                {movies?.nowPlaying
                  ?.slice(
                    NUMBER_OF_CAROUSEL_SLIDES,
                    NUMBER_OF_CAROUSEL_SLIDES + 4
                  )
                  .map((movie) => (
                    <li
                      className="feed-page__main-content__popular__movie-card"
                      key={movie.id}
                    >
                      <img
                        className="feed-page__main-content__popular__movie-card__poster"
                        src={`${getImagesURL()}/${movie.poster_path}`}
                      />
                      <h5 className="feed-page__main-content__popular__movie-card__name">
                        {movie.original_title}
                      </h5>
                      <p className="feed-page__main-content__popular__movie-card__rate">
                        <TbStarFilled />
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </>
        ) : (
          <p>No data found</p>
        )}
      </section>
      <aside className="feed-page__side-content"></aside>
    </main>
  );
}

export default FeedPage;
