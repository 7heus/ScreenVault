import { useState, useEffect } from "react";
import "./Catalog.css";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

export default function Catalog({ popular, topRated, nowPlaying, upcoming }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(popular[currentPage]);
  const pageHandler = (int) => {
    selectedPage.pageFunc(int);
  };

  const categoryHandler = (obj) => {
    setCurrentPage(0);
    setSelectedPage(obj[currentPage]);
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
          <p>Page: {currentPage + 1}</p>
          <button onClick={() => pageHandler(+1)}>{">"}</button>
        </div>
        {selectedPage.data.results.map((movie, index) => {
          return <Card movie={movie} key={index} />;
        })}
      </div>
    </>
  );
}
