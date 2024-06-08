import React, { useEffect, useState } from "react";
import {
  findMovieURL,
  getImagesURL,
  movieRecommendationsURL,
  options,
} from "../api/api";
import { TbPlus, TbStarFilled } from "react-icons/tb";
import { FaImdb } from "react-icons/fa";
import { PiTimerBold } from "react-icons/pi";
import Loader from "../components/Loader";

function MoviePage() {
  // Test Movie ID: 882059
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [recommendations, setRecommendations] = useState([]);
  const [loadRecom, setLoadRecom] = useState(true);
  const [errorRecom, setErrorRecom] = useState(false);

  const MOVIE_ID = 998846;

  useEffect(() => {
    fetch(findMovieURL(MOVIE_ID), options())
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .then(() => {
        fetch(movieRecommendationsURL(MOVIE_ID), options())
          .then((response) => response.json())
          .then((data) => {
            setRecommendations(data.results.slice(0, 8));
          })
          .catch((err) => {
            setErrorRecom(true);
          })
          .finally(() => {
            setLoadRecom(false);
          });
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [MOVIE_ID]);

  if (loading) return <PageSkeleton />;

  if (error) return <p>Something went wrong!</p>;

  return (
    <main className="movie-page">
      <div className="movie-page__header">
        <div className="movie-page__header__banner">
          <img
            src={`${getImagesURL("original")}/${movie.backdrop_path}`}
            alt=""
          />
        </div>
        <div className="movie-page__header__movie">
          <div className="movie-page__header__movie__poster">
            <img
              loading="lazy"
              src={`${getImagesURL()}/${movie.poster_path}`}
              alt=""
            />
          </div>
          <div className="movie-page__header__movie__info">
            <div>
              <h1 className="movie-page__header__movie__info__title">
                {movie.title}
              </h1>
              <div className="movie-page__header__movie__numbers">
                <p className="movie-page__header__movie__info__rate">
                  <FaImdb />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </p>
                <p className="movie-page__header__movie__info__duration">
                  <PiTimerBold />
                  <span>{`${Math.floor(movie.runtime / 60)}h ${
                    movie.runtime % 60
                  }m`}</span>
                </p>
              </div>
              <div className="movie-page__header__movie__info__genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id}>#{genre.name}</span>
                ))}
              </div>
              <p className="movie-page__header__movie__info__overview">
                {movie.overview || "Sorry, No overview provided."}
              </p>
            </div>
            <div className="movie-page__header__movie__info__actions">
              <button>
                <TbPlus />
                To Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="movie-page__container">
        <section className="movie-page__brought-by">
          <h1>Brought to you by</h1>
          <div className="movie-page__brought-by__companies">
            {movie.production_companies.map((company) => (
              <div
                className="movie-page__brought-by__companies__company"
                key={company.id}
              >
                {company.logo_path ? (
                  <img
                    src={`${getImagesURL()}/${company.logo_path}`}
                    alt={company.name}
                    draggable={false}
                  />
                ) : (
                  <span>{company.name}</span>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="movie-page__similar-movies">
          <h1>You might also like</h1>
          {loadRecom ? (
            <center>
              <Loader />
            </center>
          ) : errorRecom ? (
            <center>Something went wrong.</center>
          ) : recommendations.length > 0 ? (
            <ul className="movie-page__similar-movies__list">
              {recommendations.map((movie) => (
                <li
                  className="movie-page__similar-movies__list__movie-card"
                  key={movie.id}
                >
                  <img
                    className="movie-page__similar-movies__list__movie-card__poster"
                    src={`${getImagesURL()}/${movie.poster_path}`}
                  />
                  <h5 className="movie-page__similar-movies__list__movie-card__name">
                    {movie.original_title}
                  </h5>
                  <p className="movie-page__similar-movies__list__movie-card__rate">
                    <TbStarFilled />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <center>No movies available.</center>
          )}
          <ul className="movie-page__similar-movies__movies"></ul>
        </section>
      </div>
    </main>
  );
}

export default MoviePage;

function PageSkeleton() {
  return (
    <div className="movie-page__skeleton">
      <div className="movie-page__skeleton__header">
        <div className="movie-page__skeleton__header__banner"></div>
        <div className="movie-page__skeleton__header__movie">
          <div className="movie-page__skeleton__header__movie__poster"></div>
          <div className="movie-page__skeleton__header__movie__info">
            <div className="movie-page__skeleton__header__movie__info__title"></div>
            <div className="movie-page__skeleton__header__movie__info__paragraph-line"></div>
            <div className="movie-page__skeleton__header__movie__info__paragraph-line"></div>
            <div className="movie-page__skeleton__header__movie__info__paragraph-line"></div>
            <div className="movie-page__skeleton__header__movie__info__paragraph-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}