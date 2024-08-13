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
        setResultMovie([{ data: movieData }]);
        setResultTV([{ data: tvData }]);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]); // Re-fetch data whenever `query` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="page">
        <div className="results">
          {resultMovie[0] && resultMovie[0].data.results.length > 0 && (
            <MovieWrap h4={"Movies"} dat={resultMovie[0]} />
          )}
          {resultTV[0] && resultTV[0].data.results.length > 0 && (
            <MovieWrap h4={"TV Shows"} dat={resultTV[0]} />
          )}
        </div>
      </div>
    </>
  );
}
