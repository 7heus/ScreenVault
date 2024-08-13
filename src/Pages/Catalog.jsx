import { useState, useEffect } from "react";
import "./Catalog.css";
import MovieWrap from "./MovieWrapper";

export default function Catalog({ popular, topRated, nowPlaying, upcoming }) {
  const [currentPopPage, setCurrentPopPage] = useState(0);
  const [currentTRPage, setCurrentTRPage] = useState(0);
  const [currentNPPage, setCurrentNPPage] = useState(0);
  const [currentUCPage, setCurrentUCPage] = useState(0);

  const [popularPage, setPopularPage] = useState(
    popular ? popular[currentPopPage] : null
  );
  const [topRatedPage, setTopRatedPage] = useState(
    topRated ? topRated[currentTRPage] : null
  );
  const [nowPlayingPage, setNowPlayingPage] = useState(
    nowPlaying ? nowPlaying[currentNPPage] : null
  );
  const [upcomingPage, setUpcomingPage] = useState(
    upcoming ? upcoming[currentUCPage] : null
  );

  if (!popularPage && !topRatedPage && !nowPlayingPage && !upcomingPage) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="page">
        {popularPage && <MovieWrap h4={"Popular Now"} dat={popularPage} />}
        <br />
        <br />
        {topRatedPage && <MovieWrap h4={"Top Rated"} dat={topRatedPage} />}
        <br />
        <br />
        {nowPlayingPage && (
          <MovieWrap h4={"On Theaters"} dat={nowPlayingPage} />
        )}
        <br />
        <br />
        {upcomingPage && <MovieWrap h4={"Upcoming"} dat={upcomingPage} />}
      </div>
    </>
  );
}
