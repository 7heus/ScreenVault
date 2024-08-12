import { useState } from "react";
import "./Catalog.css";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

export default function Catalog({ popular, topRated, nowPlaying, upcoming }) {
  const [selectedPage, setSelectedPage] = useState(popular[0]);
  const [currentPage, setCurrentPage] = useState(selectedPage.data.page);

  return (
    <>
      <div className="buttons">
        <button>Popular</button>
        <button>Top Rated</button>
        <button>Upcoming</button>
        <button>Now Playing</button>
      </div>
      <div className="render">
        <div className="buttons">
          <button onClick={() => selectedPage.pageFunc(-1, setCurrentPage)}>
            {"<"}
          </button>
          <p>Page: {currentPage}</p>
          <button onClick={() => selectedPage.pageFunc(+1, setCurrentPage)}>
            {">"}
          </button>
        </div>
        {selectedPage.data.results.map((movie, index) => {
          return <Card movie={movie} key={index} />;
        })}
      </div>
    </>
  );
}
