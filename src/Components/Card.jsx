import { Link } from "react-router-dom";

export default function Card({ movie }) {
  const convertDate = (date) => {
    const splitted = date.split("-");
    return {
      year: splitted[0],
      month: splitted[1],
      day: splitted[2],
    };
  };

  const limitedOverview = (overview) => {
    const cutOverview = overview.split(" ");
    if (cutOverview.length >= 15) {
      cutOverview.slice(0, 14);
      const joined = cutOverview.join(" ");
      return `${joined}...`;
    } else return overview;
  };

  const date = convertDate(movie.release_date);
  return (
    <Link to={`/Catalog/${movie.id}`}>
      <div className="Card">
        <img
          src={`https://image.tmdb.org/t/p/w350/${movie.poster_path}`}
          alt={movie.original_title}
        />
        <h2>
          {movie.title}
          {movie.adult && "🔞"}
        </h2>
        <p>
          Released in {date.day}/{date.month}/{date.year}
        </p>
        <p>{limitedOverview(movie.overview)}</p>
      </div>
    </Link>
  );
}
