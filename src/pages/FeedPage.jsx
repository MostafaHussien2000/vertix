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
  TbSettings2,
  TbStarFilled,
  TbVideo,
} from "react-icons/tb";
import Loader from "../components/Loader";

function FeedPage() {
  const NUMBER_OF_FEATURED_MOVIES = 3;
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
              {movies?.nowPlaying
                ?.slice(0, NUMBER_OF_FEATURED_MOVIES)
                .map((movie) => (
                  <li key={movie.id}>
                    <img src={`${getImagesURL()}/${movie.backdrop_path}`} />
                    <span>{movie.original_title}</span>
                  </li>
                ))}
            </div>
            <div className="feed-page__main-content__popular">
              <h1>Popular Movies</h1>
              <ul>
                {movies?.nowPlaying
                  ?.slice(
                    NUMBER_OF_FEATURED_MOVIES,
                    NUMBER_OF_FEATURED_MOVIES + 4
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

                        <span>{movie.vote_average}</span>
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
