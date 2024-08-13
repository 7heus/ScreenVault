import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../lib/TMDb";
import "./Details.css";
import IMDbpic from "../assets/IMDb.png";
import Navbar from "../Components/Navbar";

export default function Details() {
  const { itemId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    getMovieDetails(itemId).then((data) => {
      setMovieDetails(data);
    });
  }, [itemId]);

  if (!movieDetails) return <p>Loading...</p>;

  console.log(movieDetails);

  return (
    <>
      <div className="Details" style={{ paddingTop: 50 }}>
        <h1>{movieDetails.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
          alt={movieDetails.original_title}
          width={500}
        />
        <p>{movieDetails.overview}</p>
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
