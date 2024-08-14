import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMovieDetails,
  fetchVideos,
  getRecommendations,
} from "../../lib/TMDb";
import "./Details.css";
import IMDbpic from "../assets/IMDb.png";
import ReactPlayer from "react-player";
import MovieWrap from "./MovieWrapper";
import {
  getLists,
  updateList,
  createList,
  checkIfExists,
  postFavorite,
  getList,
  getFavorites,
  deleteFavorite,
  getWatchLater,
  getWatched,
  postWatched,
  deleteWatched,
  postWatchLater,
  deleteWatchLater,
} from "../../lib/Local";

export default function Details() {
  const { itemId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [inFavorite, setInFavorite] = useState(false);
  const [listsContaining, setListsContaining] = useState([]);
  const [isInWatchLater, setIsInWatchLater] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [IMDBId, setIMDbId] = useState("");
  const [recommendedList, setRecommendedList] = useState([]);

  useEffect(() => {
    getMovieDetails(itemId).then((data) => {
      setMovieDetails(data);
    });
  }, [itemId]);
  useEffect(() => {
    setRecommendedList([]);
    fetchVideos(itemId).then((data) => {
      const vid = data.results.filter((video) => video.type === "Trailer")[0];
      vid && setTrailer(`https://www.youtube.com/watch?v=${vid.key}`);
    });

    getLists().then((data) => {
      if (data.length === 0) setLists("No lists... create one?");
      const myLists = [];
      data.map((list) => {
        myLists.push({ id: list.id, name: list.name });
      });
      setLists(myLists);
    });

    getRecommendations(itemId, 1, "en-US").then((data) => {
      setRecommendedList([...data.results]);
    });

    movieDetails && setIMDbId(movieDetails.imdb_id);
  }, [movieDetails]);

  const getMoreRecommended = async (page) => {
    const data = await getRecommendations(itemId, page, "en-US");

    const newMovieList = data && [...recommendedList, ...data.results];
    setRecommendedList(newMovieList);

    return;
  };

  useEffect(() => {
    getFavorites().then((data) => {
      data.forEach((li) => {
        if (String.toString(li.movieId) === String.toString(itemId))
          setInFavorite(true);
      });
    });
    getLists().then((data) => {
      data.forEach((li) => {
        if (li.data.includes(`${itemId}`))
          setListsContaining([...listsContaining, li.id]);
      });
    });
    getWatchLater().then((data) => {
      data.forEach((li) => {
        if (String.toString(li.movieId) === String.toString(itemId))
          setIsInWatchLater(true);
      });
    });
    getWatched().then((data) => {
      data.forEach((li) => {
        if (String.toString(li.movieId) === String.toString(itemId))
          setIsWatched(true);
      });
    });
  }, [trailer]);

  const handleSelect = (e) => {
    setSelectedList(e.target.value);
  };

  const addToFavorite = () => {
    checkIfExists("favorites", itemId).then((value) => {
      if (value === true) return;
      postFavorite(`${itemId}`);
      setInFavorite(true);
    });
  };

  const removeFavorite = () => {
    getFavorites().then((data) => {
      const toDelete = data.filter((x) => x.movieId === `${itemId}`)[0];
      deleteFavorite(toDelete.id).then(() => console.log("deleted"));
      setInFavorite(false);
    });
  };

  const addToList = () => {
    if (!selectedList) return;
    checkIfExists("inList", itemId, selectedList).then((value) => {
      if (value === true) return;
      getList(selectedList).then((li) => {
        if (li.data.includes(itemId)) return;
        const format = {
          name: li.name,
          data: [...li.data, `${itemId}`],
        };
        updateList(selectedList, format).then(() =>
          setListsContaining([...listsContaining, `${li.id}`])
        );
      });
    });
  };

  const addToWatched = () => {
    postWatched(itemId).then(() => setIsWatched(true));
  };
  const removeWatched = () => {
    getWatched().then((data) => {
      const toDelete = data.filter((x) => x.movieId === `${itemId}`)[0];
      deleteWatched(toDelete.id).then(() => setIsWatched(false));
    });
  };

  const addToWatchLater = () =>
    postWatchLater(itemId).then(() => setIsInWatchLater(true));

  const removeWatchLater = () => {
    getWatchLater().then((data) => {
      const toDelete = data.filter((x) => x.movieId === `${itemId}`)[0];
      deleteWatchLater(toDelete.id).then(() => setIsInWatchLater(false));
    });
  };

  const removeFromList = () => {
    getList(selectedList).then((dat) => {
      const filtered = dat.data.filter((x) => x != `${itemId}`);
      const format = {
        name: dat.name,
        data: filtered,
      };
      updateList(selectedList, format).then(() =>
        setListsContaining(listsContaining.filter((x) => x != dat.id))
      );
    });
  };

  if (!movieDetails) return <p>Loading...</p>;

  return (
    <>
      <div className="Details" style={{ paddingTop: 50 }}>
        {trailer && (
          <ReactPlayer
            url={trailer}
            playing={true}
            style={{ paddingTop: 50, marginBottom: 50 }}
            width={800}
            muted={true}
            controls={true}
          />
        )}

        <div className="movie-flex">
          <img
            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
            alt={movieDetails.original_title}
            width={500}
          />

          <div className="movie-div">
            <h1>{movieDetails.title}</h1>
            <h3>{movieDetails.overview}</h3>
            <p>
              Genre: {movieDetails.genres[0] && movieDetails.genres[0].name} &{" "}
              {movieDetails.genres[1] && movieDetails.genres[1].name}
            </p>
            <p>
              Release Date:{" "}
              {movieDetails.release_date && movieDetails.release_date}
            </p>
            <p>
              Origin Country:{" "}
              {movieDetails.origin_country && movieDetails.origin_country}
            </p>
            <p>
              Original Language:{" "}
              {movieDetails.original_language &&
                movieDetails.original_language.toUpperCase()}
            </p>
            <p>Runtime: {movieDetails.runtime && movieDetails.runtime} min</p>
            <p>
              Production:{" "}
              {movieDetails.production_companies[0] &&
                movieDetails.production_companies[0].name}
            </p>
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={!inFavorite ? addToFavorite : removeFavorite}
            className="buttonFromDetails"
          >
            {inFavorite ? "Remove Favorite" : "Add to Favorite"}
          </button>
          <button
            onClick={!isWatched ? addToWatched : removeWatched}
            className="buttonFromDetails"
          >
            {!isWatched ? "I watched this" : "Not watched"}
          </button>
          <button
            onClick={!isInWatchLater ? addToWatchLater : removeWatchLater}
            className="buttonFromDetails"
          >
            {!isInWatchLater ? "Watch Later" : "Remove from 'Watch Later'"}
          </button>
          <select
            id="lists"
            name="lists"
            value={selectedList}
            onChange={handleSelect}
            className="buttonFromDetails"
          >
            <option value="" disabled hidden>
              ...
            </option>
            {lists.map((list, index) => (
              <option key={index} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
          <button
            onClick={
              !listsContaining.includes(selectedList)
                ? addToList
                : removeFromList
            }
            className="buttonFromDetails"
          >
            {listsContaining.includes(selectedList)
              ? "Remove from List"
              : "Add to List"}
          </button>
        </div>
        <MovieWrap
          h4={"Recommendations"}
          data={recommendedList}
          getMoreData={getMoreRecommended}
          moreData={true}
        />
        <a href={`https://www.imdb.com/title/${IMDBId}`}>
          <img className="IMDpic" src={IMDbpic} />
        </a>
        <p className="rating">Rating: {movieDetails.vote_average}</p>
      </div>
    </>
  );
}
