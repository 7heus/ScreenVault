import { useState, useEffect } from "react";
import "./Catalog.css";
import MovieWrap from "./MovieWrapper";

export default function Catalog({
  popular,
  topRated,
  nowPlaying,
  upcoming,
  getMorePopularMovies,
  getMoreTopRatedMovies,
  getMoreUpcomingMovies,
  getMoreAiringMovies,
}) {
  return (
    <>
      <div className="page-catalog">
        <MovieWrap
          h4={"Popular Now"}
          data={popular}
          getMoreData={getMorePopularMovies}
          moreData={true}
        />
        <MovieWrap
          h4={"Top Rated"}
          data={topRated}
          getMoreData={getMoreTopRatedMovies}
          moreData={true}
        />
        <MovieWrap
          h4={"On Theaters"}
          data={nowPlaying}
          getMoreData={getMoreAiringMovies}
          moreData={true}
        />
        <MovieWrap
          h4={"Upcoming"}
          data={upcoming}
          getMoreData={getMoreUpcomingMovies}
          moreData={true}
        />
      </div>
      <br />
      <br />
    </>
  );
}
