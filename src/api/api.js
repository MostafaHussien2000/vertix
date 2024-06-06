const API_URL = process.env.REACT_APP_TMDB_API_URL;
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

export const options = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const popularMoviesURL = (adult = false, video = false, page = 2) =>
  `${API_URL}/3/discover/movie?include_adult=${adult}&include_video=${video}&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${API_KEY}`;

export const nowPlayingMoviesURL = (adult = false, video = false, page = 1) =>
  `${API_URL}/3/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`;

export const getImagesURL = (size = "w500") =>
  `https://image.tmdb.org/t/p/${size}`;

export const findMovieURL = (movieId) =>
  `${API_URL}/3/movie/${movieId}?language=en-US`;

export const movieRecommendationsURL = (movieId) =>
  `${API_URL}/3/movie/${movieId}/recommendations?language=en-US&page=1`;
