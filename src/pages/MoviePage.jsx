/* React Hooks
============== */
import { useEffect, useState } from "react";
/* React Icons
============== */
import {TbArrowNarrowLeft, TbPlus, TbTrash} from "react-icons/tb";
import { FaImdb } from "react-icons/fa";
import { PiTimerBold } from "react-icons/pi";
/* API URLs
=========== */
import {
  getMovieDataURL,
  getImagesURL,
  movieRecommendationsURL,
  options, getMovieReviewURL,
} from "../api/api";
/* React Components
=================== */
import Loader from "../components/loaders/Loader";
import MediaCard from "../components/MediaCard";
import ReviewCard from "../components/ReviewCard";
import Skeleton from "../components/loaders/Skeleton";
import RequestLoader from "../components/RequestLoader";
/* SLick Slider
=============== */
import Slider from "react-slick";
/* React Router DOM
=================== */
import {Link, useParams} from "react-router-dom";
/* Firebase Functions
===================== */
import {addMediaToWatchList, isItemInWatchList, removeMediaFromWatchList} from "../api/firebase-functions";
/* Auth
======= */
import {useAuth} from "../context/AuthContext";

function MoviePage() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [recommendations, setRecommendations] = useState([]);
  const [loadRecom, setLoadRecom] = useState(true);
  const [errorRecom, setErrorRecom] = useState(false);

  const [reviews, setReviews] = useState({
    data: [],
    loading: true,
    error: ""
  })

  const [loadingBackdropImage, setLoadingBackdropImage] = useState(true);


  const {id: movieId} = useParams()

  const {currentUser} = useAuth();

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
            .then(() => {
              fetch(getMovieReviewURL(movieId), options())
                  .then((response) => response.json())
                  .then(data => setReviews(old => ({...old, data: data.results})))
                  .catch(err => setReviews(old => ({...old, error: "Something went wrong."})))
                  .finally(() => setReviews(old => ({...old, loading: false})))
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

  // Carousel Settings
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 5 slides at a time
    slidesToScroll: 1, // Scroll one slide at a time
    centerMode: false, // Centers the active slide
    centerPadding: '0', // No padding around the centered slide
    focusOnSelect: false, // Focus on the selected slide
    gap: 20,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
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

  const addToWatchlist = async () => {
    try {
      await addMediaToWatchList(currentUser.uid, movieId, "movies");
    } catch (err) {
      console.error(err);
    }
  }
  const removeFromWatchList = async () => {
    console.log("removing from watchlist...")
    try {
      await removeMediaFromWatchList(currentUser.uid, movieId, "movies")
    } catch (err) {
      console.error(err);
    }
  }


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
              alt={`${movie.title} poster.`}
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
              <WatchlistActionButton userId={currentUser?.uid} mediaId={movieId} mediaType={"movies"}/>
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
        <section className="movie-page__reviews">
          <h1>Reviews</h1>
          <div className="movie-page__reviews__items">
            <Slider {...settings}>
              {
                reviews?.loading ?
                    <Loader />
                    : reviews?.data?.map(item => <ReviewCard review={item} key={item.author_details.username}/>)
              }
            </Slider>
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

function WatchlistActionButton ({userId, mediaId, mediaType}) {
  const [btnState, setBtnState] = useState(false);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const state = await isItemInWatchList(userId, mediaId, mediaType);
        setBtnState(state);
      } catch (err) {
        console.error(err);
      }
    };
    checkWatchlist()

    return () => {
    };
  }, [])
  const addToWatchlist = async () => {
    setLoading(true)
    try {
      await addMediaToWatchList(userId, mediaId, mediaType);
      setBtnState(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }
  const removeFromWatchList = async () => {
    setLoading(true)
    try {
      await removeMediaFromWatchList(userId, mediaId, mediaType)
      setBtnState(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }
  return (
      <>
        {
          btnState ? (
              <button className={`btn-danger ${loading ? "disabled-btn" : ""}`} onClick={removeFromWatchList}>
                {
                  loading ? (
                      <>
                        <RequestLoader />
                        Removing Movie From Watchlist ...
                      </>
                  ) : (
                      <>
                        <TbTrash />
                        Remove From Watchlist
                      </>
                  )
                }
              </button>
          ) : (
              <button className={`${loading ? "disabled-btn" : ""}`} onClick={addToWatchlist}>
                {
                  loading ? (
                      <>
                        <RequestLoader />
                        Adding Movie To Watchlist ...
                      </>
                  ) : (
                      <>
                        <TbPlus/>
                        To Watchlist
                      </>
                  )
                }
              </button>
          )
        }
      </>
  )
}