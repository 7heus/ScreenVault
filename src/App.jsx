import { useState, useEffect } from "react";
import "./App.css";
import {
  getNowPlaying,
  getPopularMovies,
  getTopRatedMovies,
  getUpcoming,
} from "../lib/TMDb";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Catalog from "./Pages/Catalog";
import Details from "./Pages/Details";
import Add from "./Pages/Add";
import Update from "./Pages/Update";
import AboutUs from "./Pages/AboutUs";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  const [count, setCount] = useState(0);
  const [popularList, setPopularList] = useState(null);
  const [topRatedList, setTopRatedList] = useState(null);
  const [nowPlayingList, setNowPlayingList] = useState(null);
  const [upcomingList, setUpcomingList] = useState(null);

  useEffect(() => {
    getPopularMovies().then((data) => setPopularList(data));
    getTopRatedMovies().then((data) => setTopRatedList(data));
    getNowPlaying().then((data) => setNowPlayingList(data));
    getUpcoming().then((data) => setUpcomingList(data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/:itemId" element={<Details />} />
      <Route path="/add" element={<Add />} />
      <Route path="/update" element={<Update />} />

      <Route path="/about" element={<AboutUs />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
