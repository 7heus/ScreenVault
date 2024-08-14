import { useSearchParams } from "react-router-dom";
import { searchForMovie, searchForTV } from "../../lib/TMDb";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import MovieWrap from "./MovieWrapper";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q").replace("_", " ");
  const [resultMovie, setResultMovie] = useState([]);
  const [resultTV, setResultTV] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const movieData = await searchForMovie(query, "en-US", 1, false);
        const tvData = await searchForTV(query, "en-US", 1, false);
        setResultMovie(movieData.results);
        setResultTV(tvData.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);
  const getMoreMovies = async (page) => {
    const data = await searchForMovie(query, "en-US", page, false);
    console.log(data);

    // const newMovieList = data && [...resultMovie, data.results];
    // setResultMovie(newMovieList);

    return;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="page">
        <div className="results">
          {resultMovie.length > 0 && (
            <MovieWrap
              h4={"Movies"}
              data={resultMovie}
              moreData={true}
              getMoreData={getMoreMovies}
            />
          )}
          {resultTV.length > 0 && (
            <MovieWrap h4={"TV Shows"} data={resultTV} moreData={true} />
          )}
        </div>
      </div>
    </>
  );
}
