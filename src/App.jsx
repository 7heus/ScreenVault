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
  const [popularPage, setPopularPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [nowPlayingPage, setNowPlayingPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [popularList, setPopularList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [nowPlayingList, setNowPlayingList] = useState([]);
  const [upcomingList, setUpcomingList] = useState([]);

  useEffect(() => {
    getPopularMovies().then((data) => setPopularList([...popularList, data]));
    getTopRatedMovies().then((data) =>
      setTopRatedList([...topRatedList, data])
    );
    getNowPlaying().then((data) =>
      setNowPlayingList([...nowPlayingList, data])
    );
    getUpcoming().then((data) => setUpcomingList([...upcomingList, data]));
  }, []);

  const updatePopular = (lang) => {
    popularList.forEach((x) => {});
  };

  const updateTopRated = (lang, page) =>
    getTopRatedMovies(lang, page).then((data) => setTopRatedList(data));

  const updateNowPlaying = (lang, page) =>
    getNowPlaying(lang, page).then((data) => setNowPlayingList(data));

  const updateUpcoming = (lang, page) =>
    getUpcoming(lang, page).then((data) => setUpcomingList(data));
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
