import { useState, useEffect } from "react";
import "./Catalog.css";
import MovieWrap from "./MovieWrapper";

export default function Catalog({
  popular,
  topRated,
  nowPlaying,
  upcoming,
  getMorePopularMovies,
}) {
  return (
    <>
      <div className="page">
        <MovieWrap
          h4={"Popular Now"}
          data={popular}
          getMoreData={getMorePopularMovies}
        />
        {/* <br />
        <br />
        <MovieWrap h4={"Top Rated"} data={topRated} />
        <br />
        <br />
        <MovieWrap h4={"On Theaters"} data={nowPlaying} />
        <br />
        <br />
        <MovieWrap h4={"Upcoming"} data={upcoming} /> */}
      </div>
    </>
  );
}
