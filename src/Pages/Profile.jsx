import MovieWrap from "./MovieWrapper";
import Card from "../Components/Card";
import { getFavorites, getWatched, getWatchLater } from "../../lib/Local";
import { getMovieDetails } from "../../lib/TMDb";
import { useState, useEffect } from "react";

export default function Profile() {
  const [favorites, setFavorites] = useState({ data: { results: [] } });
  const [watched, setWatched] = useState({ data: { results: [] } });
  const [watchLater, setWatchLater] = useState({ data: { results: [] } });
  const [selectedList, setSelectedList] = useState("");
  const [selectedListItems, setSelectedListItems] = useState({
    data: { results: [] },
  });

  const fetchData = async () => {
    getFavorites().then((data) => {
      data.forEach((obj) => {
        getMovieDetails(obj.movieId, "en-US").then((dat) => {
          const exists = favorites.data.results.some((x) => x.id === dat.id);
          console.log(exists);
          if (exists) return;
          setFavorites((prev) => ({
            ...prev,
            data: { ...prev.data, results: [...prev.data.results, dat] },
          }));
          return;
        });
      });
    });
    getWatched().then((data) => {
      data.forEach((obj) => {
        getMovieDetails(obj.movieId, "en-US").then((dat) => {
          setWatched({ data: { results: [...watched.data.results, dat] } });
        });
      });
    });
    getWatchLater().then((data) => {
      data.forEach((obj) => {
        getMovieDetails(obj.movieId, "en-US").then((dat) => {
          setWatchLater({ data: { results: [watchLater.data.results, dat] } });
        });
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return <div>{/* <MovieWrap h4={"Favorites"} dat={favorites} /> */}</div>;
}
