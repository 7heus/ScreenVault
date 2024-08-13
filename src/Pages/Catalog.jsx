import { useState, useEffect } from "react";
import "./Catalog.css";
import MovieWrap from "./MovieWrapper";

/*               currentPagePopular={currentPagePopular}
              currentPageNowPlaying={currentPageNowPlaying}
              currentPageTopRated={currentPageTopRated}
              currentPageUpcoming={currentPageUpcoming}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
                            setCurrentPageNowPlaying={setCurrentPageNowPlaying}
              setCurrentPagePopular={setCurrentPagePopular}
              setCurrentPageTopRated={setCurrentPageTopRated}
              setCurrentPageUpcoming={setCurrentPageUpcoming}*/

export default function Catalog({
  popular,
  topRated,
  nowPlaying,
  upcoming,
  currentPagePopular,
  currentPageNowPlaying,
  currentPageTopRated,
  currentPageUpcoming,
  handleNextPage,
  handlePrevPage,
  setCurrentPagePopular,
  setCurrentPageTopRated,
  setCurrentPageNowPlaying,
  setCurrentPageUpcoming,
  fetch,
}) {
  // const [currentPopPage, setCurrentPopPage] = useState(0);
  // const [currentTRPage, setCurrentTRPage] = useState(0);
  // const [currentNPPage, setCurrentNPPage] = useState(0);
  // const [currentUCPage, setCurrentUCPage] = useState(0);

  const [popularPage, setPopularPage] = useState(
    popular ? popular[currentPagePopular - 1] : null
  );
  const [topRatedPage, setTopRatedPage] = useState(
    topRated ? topRated[currentPageTopRated - 1] : null
  );
  const [nowPlayingPage, setNowPlayingPage] = useState(
    nowPlaying ? nowPlaying[currentPageNowPlaying - 1] : null
  );
  const [upcomingPage, setUpcomingPage] = useState(
    upcoming ? upcoming[currentPageUpcoming - 1] : null
  );

  useEffect(() => {
    setPopularPage(popular ? popular[currentPagePopular - 1] : null);
    setTopRatedPage(topRated ? topRated[currentPageTopRated - 1] : null);
    setNowPlayingPage(
      nowPlaying ? nowPlaying[currentPageNowPlaying - 1] : null
    );
    setUpcomingPage(upcoming ? upcoming[currentPageUpcoming - 1] : null);
  }, [
    currentPageNowPlaying,
    currentPagePopular,
    currentPageTopRated,
    currentPageUpcoming,
    popular,
    topRated,
    nowPlaying,
    upcoming,
  ]);

  if (!popularPage && !topRatedPage && !nowPlayingPage && !upcomingPage) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="page">
        {popularPage && (
          <MovieWrap
            h4={"Popular Now"}
            dat={popularPage}
            current={currentPagePopular}
            setCurrent={setCurrentPagePopular}
            prevPage={handlePrevPage}
            nextPage={handleNextPage}
          />
        )}
        <br />
        <br />
        {topRatedPage && (
          <MovieWrap
            h4={"Top Rated"}
            dat={topRatedPage}
            current={currentPageTopRated}
            setCurrent={setCurrentPageTopRated}
            prevPage={handlePrevPage}
            nextPage={handleNextPage}
          />
        )}
        <br />
        <br />
        {nowPlayingPage && (
          <MovieWrap
            h4={"On Theaters"}
            dat={nowPlayingPage}
            current={currentPageNowPlaying}
            setCurrent={setCurrentPageNowPlaying}
            prevPage={handlePrevPage}
            nextPage={handleNextPage}
          />
        )}
        <br />
        <br />
        {upcomingPage && (
          <MovieWrap
            h4={"Upcoming"}
            dat={upcomingPage}
            current={currentPageUpcoming}
            setCurrent={setCurrentPageUpcoming}
            prevPage={handlePrevPage}
            nextPage={handleNextPage}
          />
        )}
      </div>
    </>
  );
}
