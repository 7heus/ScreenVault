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

/*
---------- JOAO'S FEEDBACK ----------
I've refactor this function, if you want to use default values is better to set them in the parameter declaration, shorter and cleaner code.
I haven't refactor the other functions like this one.
-------------------------------------
*/
/**
 * Get movies from the TMDB API from a specific category.
 * @param {String} category - The category of movies to fetch. Default is "popular".
 * @param {String} lang - The language of the movies to fetch. Default is "en-US".
 * @param {Number} page - The number of pages to fetch. Default is 1.
 * @returns {Object} - The response data containing category movies.
 */

export const getMovies = async (
  category = "popular",
  lang = "un-US",
  page = 1
) => {
  try {
    /* Make a GET request to fetch popular movies from the TMDB API */
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${category}?language=${lang}&page=${page}`,
      header
    );
    return response.data; /* Return the response data containing popular movies */
  } catch (error) {
    /* If an error occurs during the request, the code inside the catch block is executed */
    console.log(error);
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
