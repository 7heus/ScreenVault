import axios from "axios"; /* Import the Axios for making HTTP requests. */

const apiKey = "4497e8a3dd4a14a51a04ae05e93c23d2"; /* TMDB API key */
const accessToken =
  /* TMDB access token for authenticated requests */
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDk3ZThhM2RkNGExNGE1MWEwNGFlMDVlOTNjMjNkMiIsIm5iZiI6MTcyMzIxNTYyMi43ODIyNTcsInN1YiI6IjY2YjYyZTI5MmYzNTY2YWFjNjdhYmUwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIh-_wNXZbeA-yQT__JYj5_mZyXjESHEX6POKWwWymE";

/* Configuration for the Axios request headers, including the authorization bearer token */
const header = {
  headers: {
    Accept: "authorization/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

export const getPopularMovies = async (lang, pages) => {
  /* Set default values if parameters are undefined */
  if (!pages)
    pages = 1; /* If the 'pages' parameter is undefined or null, set its default value to 1 */
  if (!lang)
    lang =
      "en-US"; /* If the 'lang' (language) parameter is undefined or null, set its default value to 'en-US' */
  try {
    /* Make a GET request to fetch popular movies from the TMDB API */
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=${lang}&page=${pages}`,
      header
    );
    return response.data; /* Return the response data containing popular movies */
  } catch (error) {
    /* If an error occurs during the request, the code inside the catch block is executed */
    console.log(error);
  }
};

export const getTopRatedMovies = async (lang, pages) => {
  if (!lang) lang = "en-US";
  if (!pages) pages = 1;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=${lang}&page=${pages}`,
      header
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNowPlaying = async (lang, pages) => {
  if (!lang) lang = "en-US";
  if (!pages) pages = 1;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?language=${lang}&page=${pages}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUpcoming = async (lang, pages) => {
  if (!lang) lang = "en-US";
  if (!pages) pages = 1;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=${lang}&page=${pages}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieDetails = async (id, lang) => {
  if (!lang) lang = "en-US";
  if (!id) return;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=${lang}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieImages = async (id) => {
  if (!id) return;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      header
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchForMovie = async (query, lang, page, adult) => {
  if (!query) return;
  if (!lang) lang = "en-US";
  if (!page) page = 1;
  if (!adult) adult = false;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=${adult}&language=${lang}&page=${page}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchForTV = async (query, lang, page, adult) => {
  if (!query) return;
  if (!lang) lang = "en-US";
  if (!page) page = 1;
  if (!adult) adult = false;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/tv?query=${query}?include_adult=${adult}&language=${lang}&page=${page}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchVideos = async (id) => {
  if (!id) return;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      header
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMoviesByGenre = async (genreId, lang, page) => {
  if (!lang) lang = "en-US";
  if (!page) page = 1;
  if (!genreId) return;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=${lang}&page=${page}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRecommendations = async (page, lang) => {
  if (!lang) lang = "en-US";
  if (!page) page = 1;
  try {
    const response = await axios.get(
      `  https://api.themoviedb.org/3/movie/967847/recommendations?language=${lang}&page=${page}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
