import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../lib/TMDb";

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
    <div className="Details">
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
      <p>Rating: {movieDetails.vote_average}</p>
      <p>Origin Country: {movieDetails.origin_country}</p>
      <p>Original Language: {movieDetails.original_language.toUpperCase()}</p>
      <p>Runtime: {movieDetails.runtime} min</p>
      <p>
        Production: {movieDetails.production_companies[0].name} &{" "}
        {movieDetails.production_companies[1].name}
      </p>
    </div>
  );
}
