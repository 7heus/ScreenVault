import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import "./RandomMovie.css";
import drumRoll from "../assets/mixkit-drum-roll-566.mp3";

export default function RandomMovie({
  popular,
  topRated,
  nowPlaying,
  upcoming,
  genres,
  getMoviesByGenre, // Receive the function prop
}) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [randomMovieData, setRandomMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genreMovies, setGenreMovies] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (selectedGenre !== "All") {
        const movies = await getMoviesByGenre(selectedGenre);
        setGenreMovies(movies.results || []);
      } else {
        setGenreMovies([...popular, ...topRated, ...nowPlaying, ...upcoming]);
      }
    };

    fetchGenreMovies();
  }, [
    selectedGenre,
    popular,
    topRated,
    nowPlaying,
    upcoming,
    getMoviesByGenre,
  ]);

  const randomizeMovie = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1.5;
      audioRef.current.play();
    }

    setLoading(true);
    const randomIndex = Math.floor(Math.random() * genreMovies.length);
    const randomMovie = genreMovies[randomIndex];

    setTimeout(() => {
      setRandomMovieData(randomMovie);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="random-movie-page">
      <h1>Don't know what to watch?</h1>

      <div className="genre-selector">
        <label htmlFor="genre">Select Genre: </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="optionsList"
        >
          <option className="optionsList" value="All">All</option>
          {genres.map((genre) => (
            <option className="optionsList" key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <br/>
      <button className="RandomMovieBtn" onClick={randomizeMovie}>Pick a Random Movie</button>
      <audio ref={audioRef} src={drumRoll} />

      {loading && (
        <div className="movie-wheel">
          <div className="movie-wheel-inner">
            {genreMovies.slice(0, 12).map((movie, index) => (
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
