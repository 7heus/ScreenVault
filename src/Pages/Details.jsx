import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../lib/TMDb";
import "./Details.css";
import IMDbpic from "../assets/IMDb.png";

export default function Details() {
  const { itemId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    getMovieDetails(itemId).then((data) => {
      setMovieDetails(data);
    });
  }, [itemId]);

  if (!movieDetails) return <p>Loading...</p>;

  return (
    <div className="Details">
      <h1>{movieDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
        alt={movieDetails.original_title}
        width={500}
      />
      <p>{movieDetails.overview}</p>
      <br/>
      <p>Release Date: {movieDetails.release_date}</p>
      <br/><br/><br/>
      <a href="https://www.imdb.com/"><img className="IMDpic" src={IMDbpic}/></a>
      <p className="rating">Rating: {movieDetails.vote_average}</p>
    </div>
  );
}
