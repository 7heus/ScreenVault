import { useState, useEffect } from "react";
import "./Catalog.css";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Catalog({ popular, topRated, nowPlaying, upcoming }) {
  const [currentPopPage, setCurrentPopPage] = useState(0);
  const [currentTRPage, setCurrentTRPage] = useState(0);
  const [currentNPPage, setCurrentNPPage] = useState(0);
  const [currentUCPage, setCurrentUCPage] = useState(0);

  const [popularPage, setPopularPage] = useState(popular[0]);
  const [topRatedPage, setTopRatedPage] = useState(topRated[currentTRPage]);
  const [nowPlayingPage, setNowPlayingPage] = useState(
    nowPlaying[currentNPPage]
  );
  const [upcomingPage, setUpcomingPage] = useState(upcoming[currentUCPage]);

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="movie-wrap">
          <h4>Popular Now</h4>
          {/* <div className="buttons">
            <button onClick={() => {}}>{"<"}</button>
            <p>Page: {currentPopPage + 1}</p>
            <button onClick={() => {}}>{">"}</button>
          </div> */}

          <div className="movie">
            {popularPage.data.results.map((movie, index) => {
              return (
                <div className="card" key={index}>
                  <Card movie={movie} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="movie-wrap">
          <h4>Top Rated</h4>
          {/* <div className="buttons">
            <button onClick={() => {}}>{"<"}</button>
            <p>Page: {currentTRPage + 1}</p>
            <button onClick={() => {}}>{">"}</button>
          </div> */}

          <div className="movie">
            {topRatedPage.data.results.map((movie, index) => {
              return (
                <div className="card" key={index}>
                  <Card movie={movie} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="movie-wrap">
          <h4>On Theaters</h4>
          {/* <div className="buttons">
            <button onClick={() => {}}>{"<"}</button>
            <p>Page: {currentNPPage + 1}</p>
            <button onClick={() => {}}>{">"}</button>
          </div> */}

          <div className="movie">
            {nowPlayingPage.data.results.map((movie, index) => {
              return (
                <div className="card" key={index}>
                  <Card movie={movie} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="movie-wrap">
          <h4>Upcoming</h4>
          {/* <div className="buttons">
            <button onClick={() => {}}>{"<"}</button>
            <p>Page: {currentUCPage + 1}</p>
            <button onClick={() => {}}>{">"}</button>
          </div> */}

          <div className="movie">
            {upcomingPage.data.results.map((movie, index) => {
              return (
                <div className="card" key={index}>
                  <Card movie={movie} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
