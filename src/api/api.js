const API_URL = process.env.REACT_APP_TMDB_API_URL;
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;


/* Request Options
================== */
export const options = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

/* Get Images URL
================= */
export const getImagesURL = (size = "w500") =>
    `https://image.tmdb.org/t/p/${size}`;


/* Movies Related URLs
====================== */
export const popularMoviesURL = (adult = false, video = false, page = 2) =>
  `${API_URL}/3/discover/movie?include_adult=${adult}&include_video=${video}&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${API_KEY}`;
export const nowPlayingMoviesURL = (adult = false, video = false, page = 1) =>
  `${API_URL}/3/movie/now_playing?language=en-US&page=${page}&api_key=${API_KEY}`;
export const topRatedMoviesURL = (page = 1) => `${API_URL}/3/movie/top_rated?language=en-US&page=${page}`
export const upcomingMoviesURL = ( page = 1) =>
    `${API_URL}/3/movie/upcoming?language=en-US&page=${page}`;
export const movieRecommendationsURL = (movieId) =>
  `${API_URL}/3/movie/${movieId}/recommendations?language=en-US&page=1`;
export const getMovieDataURL = (movieId) =>
    `${API_URL}/3/movie/${movieId}?language=en-US`;

/* Series Relate URLs
===================== */
export const popularSeriesURL = (page = 1) => `${API_URL}/3/tv/popular?language=en-US&page=${page}`
export const topRatedSeriesURL = (page = 1) => `${API_URL}/3/tv/top_rated?language=en-US&page=${page}`
export const onTheAirSeriesURL = (page = 1) => `${API_URL}/3/tv/on_the_air?language=en-US&page=${page}`