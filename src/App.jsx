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
  const [currentLang, setCurrentLang] = useState("en-US");
  const [popularPage, setPopularPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [nowPlayingPage, setNowPlayingPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [popularList, setPopularList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [nowPlayingList, setNowPlayingList] = useState([]);
  const [upcomingList, setUpcomingList] = useState([]);

  useEffect(() => {
    getPopularMovies(currentLang, popularPage).then((data) =>
      setPopularList(data)
    );
    getTopRatedMovies(currentLang, topRatedPage).then((data) =>
      setTopRatedList(data)
    );
    getNowPlaying(currentLang, nowPlayingPage).then((data) =>
      setNowPlayingList(data)
    );
    getUpcoming(currentLang, upcomingPage).then((data) =>
      setUpcomingList(data)
    );
  }, []);

  const updatePopPage = (int) =>
    setPopularPage(popularPage < 1 ? 1 : popularPage + int);
  const updateTRPage = (int) =>
    setTopRatedPage(topRatedPage < 1 ? 1 : topRatedPage + int);
  const updateNPPage = (int) =>
    setNowPlayingPage(nowPlayingPage < 1 ? 1 : nowPlayingPage + int);
  const updateUpcPage = (int) =>
    setUpcomingPage(upcomingPage < 1 ? 1 : upcomingPage + int);

  useEffect(() => {
    if (popularList.page != popularPage)
      getPopularMovies(currentLang, popularPage).then((data) =>
        setPopularList(data)
      );
    if (topRatedList.page != topRatedPage)
      getTopRatedMovies(currentLang, topRatedPage).then((data) =>
        setTopRatedList(data)
      );
    if (nowPlayingList.page != nowPlayingPage)
      getNowPlaying(currentLang, nowPlayingPage).then((data) =>
        setNowPlayingList(data)
      );
    if (upcomingList.page != upcomingPage)
      getUpcoming(currentLang, upcomingPage).then((data) =>
        setUpcomingList(data)
      );
  }, [popularPage, topRatedPage, nowPlayingPage, upcomingPage]);

  const pageFunctions = {
    popular: updatePopPage,
    topRated: updateTRPage,
    nowPlaying: updateNPPage,
    upcoming: updateUpcPage,
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/catalog"
        element={
          <Catalog
            popular={popularList}
            topRated={topRatedList}
            nowPlaying={nowPlayingList}
            upcoming={upcomingList}
            pageFuncs={pageFunctions}
          />
        }
      />
      <Route path="/catalog/:itemId" element={<Details />} />
      <Route path="/add" element={<Add />} />
      <Route path="/update" element={<Update />} />

      <Route path="/about" element={<AboutUs />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
