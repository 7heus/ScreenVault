import React, { useState, useEffect } from "react";
import "./RandomMovie.css"; // Import the CSS file

export default function RandomMovie({
  popular,
  topRated,
  nowPlaying,
  upcoming,
}) {
  const [randomMovieData, setRandomMovieData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Combine all movies into a single array
  const allMovies = [
    ...popular.flatMap((page) => page.data.results),
    ...topRated.flatMap((page) => page.data.results),
    ...nowPlaying.flatMap((page) => page.data.results),
    ...upcoming.flatMap((page) => page.data.results),
  ];

  const randomizeMovie = () => {
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * allMovies.length);
    const randomMovie = allMovies[randomIndex];

    // Simulate loading time with a timeout
    setTimeout(() => {
      const randomMovieData = {
        data: {
          results: [randomMovie],
        },
      };
      setRandomMovieData(randomMovieData);
      setLoading(false);
    }, 2000); // Adjust the delay as needed
  };

  return (
    <div className="random-movie-page">
      <h1>Random Movie Selector</h1>
      <button onClick={randomizeMovie}>Pick a Random Movie</button>
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
          {/* Display random movie details here */}
          <h2>{randomMovieData.data.results[0].title}</h2>
          <img src={randomMovieData.data.results[0].image} />
        </div>
      )}
    </div>
  );
}
