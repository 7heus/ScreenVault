import { Link } from "react-router-dom";

export default function Card({ movie }) {
  const convertDate = (date) => {
    if (!date) return;
    const splitted = date.split("-");
    return {
      year: splitted[0],
      month: splitted[1],
      day: splitted[2],
    };
  };

  const date = convertDate(movie.release_date);
  return (
    <Link to={`/catalog/${movie.id}`}>
      <div className="Card">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.original_title}
          width={250}
        />
      </div>
    </Link>
  );
}
