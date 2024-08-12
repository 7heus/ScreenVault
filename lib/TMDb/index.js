import axios from "axios";

const apiKey = "4497e8a3dd4a14a51a04ae05e93c23d2";
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDk3ZThhM2RkNGExNGE1MWEwNGFlMDVlOTNjMjNkMiIsIm5iZiI6MTcyMzIxNTYyMi43ODIyNTcsInN1YiI6IjY2YjYyZTI5MmYzNTY2YWFjNjdhYmUwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIh-_wNXZbeA-yQT__JYj5_mZyXjESHEX6POKWwWymE";

const header = {
  headers: {
    Accept: "authorization/json",
    Authorization: `Bearer ${accessToken}`,
  },
};
export const getPopularMovies = async (lang, pages) => {
  if (!pages) pages = 1;
  if (!lang) lang = "en-US";
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=${lang}&page=${pages}`,
      header
    );
    return response.data;
  } catch (error) {
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
