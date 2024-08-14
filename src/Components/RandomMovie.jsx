import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import "./RandomMovie.css";
import drumRoll from "../assets/mixkit-drum-roll-566.mp3";

export default function RandomMovie({
  popular,
  topRated,
  nowPlaying,
  upcoming,
}) {
  const [randomMovieData, setRandomMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const allMovies = [...popular, ...topRated, ...nowPlaying, ...upcoming];

  const randomizeMovie = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1.5;
      audioRef.current.play();
    }

    setLoading(true);
    const randomIndex = Math.floor(Math.random() * allMovies.length);
    const randomMovie = allMovies[randomIndex];

    setTimeout(() => {
      setRandomMovieData(randomMovie);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="random-movie-page">
      <h1>Don't know what to watch?</h1>
      <button onClick={randomizeMovie}>Pick a Random Movie</button>
      <audio ref={audioRef} src={drumRoll} />
      {loading && (
        <div className="movie-wheel">
          <div className="movie-wheel-inner">
            {allMovies.slice(0, 12).map((movie, index) => (
              <div
                className="movie-wheel-item"
                style={{ transform: `rotate(${index * 30}deg)` }}
                key={index}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {randomMovieData && !loading && (
        <div>
          <h2>{randomMovieData.title}</h2>
          <Card movie={randomMovieData} />
        </div>
      )}
    </div>
  );
}
