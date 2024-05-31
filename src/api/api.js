const API_URL = process.env.REACT_APP_TMDB_API_URL;
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const popularMoviesURL = (adult = false, video = false, page = 2) =>
  `${API_URL}/movie?include_adult=${adult}&include_video=${video}&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${API_KEY}`;
