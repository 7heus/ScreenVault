import { useSearchParams } from "react-router-dom";
import { searchForMovie, searchForTV } from "../../lib/TMDb";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import MovieWrap from "./MovieWrapper";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q").replace("_", " "));
  const [resultMovie, setResultMovie] = useState([]);
  const [resultTV, setResultTV] = useState([]);

  // useEffect(() => {
  //   if (resultMovie.length === 0) {
  //     searchForMovie(query, "en-US", 1, false).then((data) => {
  //       setResultMovie([{ data: data }]);
  //     });
  //   }
  //   if (resultTV.length === 0) {
  //     searchForTV(query, "en-US", 1, false).then((data) => {
  //       setResultTV([{ data: data }]);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    setQuery(searchParams.get("q").replace("_", " "));
    if (resultMovie.length === 0) {
      searchForMovie(query, "en-US", 1, false).then((data) => {
        setResultMovie([{ data: data }]);
      });
    }
    if (resultTV.length === 0) {
      searchForTV(query, "en-US", 1, false).then((data) => {
        setResultTV([{ data: data }]);
      });
    }
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="results">
          {resultMovie[0] && resultMovie[0].data.results != 0 && (
            <MovieWrap h4={"Movies"} dat={resultMovie[0]} />
          )}
          {resultTV[0] && resultTV[0].data.results != 0 && (
            <MovieWrap h4={"TV Shows"} dat={resultTV[0]} />
          )}
        </div>
      </div>
    </>
  );
}
