import { useState, useEffect } from "react";
import "./Catalog.css";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

export default function Catalog({ popular, topRated, nowPlaying, upcoming }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(popular[currentPage]);
  const pageHandler = (int) => {
    selectedPage.pageFunc(int);
    setCurrentPage(currentPage + int);
    setSelectedPage(selectedPage[currentPage <= 1 ? 0 : currentPage - 1]);
  };

  const categoryHandler = (obj) => {
    setCurrentPage(1);
    setSelectedPage(obj[currentPage <= 1 ? 0 : currentPage - 1]);
  };

  return (
    <>
      <div className="buttons">
        <button onClick={() => categoryHandler(popular)}>Popular</button>
        <button onClick={() => categoryHandler(topRated)}>Top Rated</button>
        <button onClick={() => categoryHandler(upcoming)}>Upcoming</button>
        <button onClick={() => categoryHandler(nowPlaying)}>Now Playing</button>
      </div>
      <div className="render">
        <div className="buttons">
          <button onClick={() => pageHandler(-1)}>{"<"}</button>
          <p>Page: {currentPage}</p>
          <button onClick={() => pageHandler(+1)}>{">"}</button>
        </div>
        {selectedPage.data.results.map((movie, index) => {
          return <Card movie={movie} key={index} />;
        })}
      </div>
    </>
  );
}
