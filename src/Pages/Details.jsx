import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, fetchVideos } from "../../lib/TMDb";
import "./Details.css";
import IMDbpic from "../assets/IMDb.png";
import ReactPlayer from "react-player";
import {
  getLists,
  updateList,
  createList,
  checkIfExists,
  postFavorite,
  getList,
} from "../../lib/Local";

export default function Details() {
  const { itemId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");

  useEffect(() => {
    getMovieDetails(itemId).then((data) => {
      setMovieDetails(data);
    });
  }, [itemId]);
  useEffect(() => {
    fetchVideos(itemId).then((data) => {
      const vid = data.results.filter((video) => video.type === "Trailer")[0];
      setTrailer(`https://www.youtube.com/watch?v=${vid.key}`);
    });

    getLists().then((data) => {
      if (data.length === 0) setLists("No lists... create one?");
      const myLists = [];
      data.map((list) => {
        myLists.push({ id: list.id, name: list.name });
      });
      setLists(myLists);
    });
  }, [movieDetails]);

  const handleSelect = (e) => setSelectedList(e.target.value);

  const addToFavorite = () => {
    checkIfExists("favorites", itemId).then((value) => {
      if (value === true) return;
      postFavorite(`${itemId}`);
      console.log("added");
    });
  };

  const addToList = () => {
    checkIfExists("inList", itemId, selectedList).then((value) => {
      if (value === true) return;
      getList(selectedList).then((li) => {
        console.log(li.data);
        // const format = {
        //   name: li.name,
        //   data: [...li.data, `${itemId}`],
        // };
        // updateList(selectedList, format);
      });
    });
  };

  if (!movieDetails) return <p>Loading...</p>;

  return (
    <>
      <div className="Details" style={{ paddingTop: 50 }}>
        <ReactPlayer
          url={trailer}
          playing={true}
          style={{ paddingTop: 50, marginBottom: 50 }}
          width={800}
          muted={true}
        />
        <h1>{movieDetails.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
          alt={movieDetails.original_title}
          width={500}
        />
        <div className="buttons">
          <button onClick={addToFavorite}>Add to Favorites</button>
          <button>Add to Watched</button>
          <select
            id="lists"
            name="lists"
            value={selectedList}
            onChange={() => handleSelect}
          >
            {lists.map((list, index) => (
              <option key={index} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
          <button onClick={addToList}>Add to List</button>
        </div>
        <h3>{movieDetails.overview}</h3>
        <br />
        <p>
          Genre: {movieDetails.genres[0].name} & {movieDetails.genres[1].name}
        </p>
        <p>Release Date: {movieDetails.release_date}</p>
        <p>Origin Country: {movieDetails.origin_country}</p>
        <p>Original Language: {movieDetails.original_language.toUpperCase()}</p>
        <p>Runtime: {movieDetails.runtime} min</p>
        <p>Production: {movieDetails.production_companies[0].name}</p>
        <br />
        <br />
        <br />
        <br />
        <a href="https://www.imdb.com/">
          <img className="IMDpic" src={IMDbpic} />
        </a>
        <p className="rating">Rating: {movieDetails.vote_average}</p>
      </div>
    </>
  );
}
