import { useState, useEffect } from "react";
import "./Catalog.css";
import { Link } from "react-router-dom";
import Card from "../Components/Card";

export default function Catalog({ showItems, page, handlePageChange }) {
  return (
    <>
      <div className="buttons">
        <button onClick={() => categoryHandler("popular")}>Popular</button>
        <button onClick={() => categoryHandler("topRated")}>Top Rated</button>
        <button onClick={() => categoryHandler("upcoming")}>Upcoming</button>
        <button onClick={() => categoryHandler("nowPlaying")}>
          Now Playing
        </button>
      </div>
      <div className="render">
        <div className="buttons">
          <button onClick={() => handlePageChange("previous")}>{"<"}</button>
          <p>Page: {page}</p>
          <button onClick={() => handlePageChange("next")}>{">"}</button>
        </div>
        {showItems.map((movie, index) => {
          return <Card movie={movie} key={index} />;
        })}
      </div>
    </>
  );
}
