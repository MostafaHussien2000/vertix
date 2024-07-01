import React, { useEffect, useState } from "react";
import {
  getMovieDataURL,
  getImagesURL,
  movieRecommendationsURL,
  options,
} from "../api/api";
import {TbArrowNarrowLeft, TbPlus, TbStarFilled} from "react-icons/tb";
import { FaImdb } from "react-icons/fa";
import { PiTimerBold } from "react-icons/pi";
import Loader from "../components/loaders/Loader";
import {Link, useParams} from "react-router-dom";
import MediaCard from "../components/MediaCard";
import MediaPageSkeletonLoader from "../components/loaders/MediaPageSkeletonLoader";
import Skeleton from "../components/loaders/Skeleton";

function MoviePage() {
  // Test Movie ID: 882059
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [recommendations, setRecommendations] = useState([]);
  const [loadRecom, setLoadRecom] = useState(true);
  const [errorRecom, setErrorRecom] = useState(false);

  const [loadingBackdropImage, setLoadingBackdropImage] = useState(true)


  const {id: movieId} = useParams()

  useEffect(() => {
    fetch(getMovieDataURL(movieId), options())
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .then(() => {
        fetch(movieRecommendationsURL(movieId), options())
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
  }, [movieId, loadingBackdropImage]);

  if (loading && loadingBackdropImage) return (
      <>
        <center>loading ...</center>
        <Skeleton type={"moviePage"} />
      </>
  );

  if (error) return <p>Something went wrong!</p>;

  return (
    <main className="movie-page">
      <header className="movie-page__header">
        <Link to={"/app/feed/movies"} className={"movie-page__header__go-back"}>
          <div className={"movie-page__header__go-back__icon"}><TbArrowNarrowLeft /></div>
          <p className={"movie-page__header__go-back__text"}>Back to feed</p>
        </Link>
        <div className="movie-page__header__banner">
          <img
            src={`${getImagesURL("original")}/${movie.backdrop_path}`}
            alt={`${movie.title} banner`}
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
      </header>
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
                <MediaCard mediaType={"movie"} key={movie.id} movie={movie} reset={{movie:setMovie, loading: setLoading,error: setError, backdrop: setLoadingBackdropImage}} />
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