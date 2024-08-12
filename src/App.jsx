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
      setPopularList([{ data: data }])
    );
    getTopRatedMovies(currentLang, topRatedPage).then((data) =>
      setTopRatedList([{ data: data }])
    );
    getNowPlaying(currentLang, nowPlayingPage).then((data) =>
      setNowPlayingList([{ data: data }])
    );
    getUpcoming(currentLang, upcomingPage).then((data) =>
      setUpcomingList([{ data: data }])
    );
  }, []);

  const updatePopPage = (int, callback) => {
    setPopularPage(popularPage < 1 ? 1 : popularPage + int);
    callback(popularPage);
  };
  const updateTRPage = (int, callback) => {
    setTopRatedPage(topRatedPage < 1 ? 1 : topRatedPage + int);
    callback(topRatedPage);
  };
  const updateNPPage = (int, callback) => {
    setNowPlayingPage(nowPlayingPage < 1 ? 1 : nowPlayingPage + int);
    callback(nowPlayingPage);
  };
  const updateUpcPage = (int, callback) => {
    setUpcomingPage(upcomingPage < 1 ? 1 : upcomingPage + int);
    callback(upcomingPage);
  };

  useEffect(() => {
    if (!popularList[0] || popularList[0].data.page != popularPage)
      getPopularMovies(currentLang, popularPage).then((data) =>
        setPopularList([{ data: data, pageFunc: updatePopPage }])
      );
    if (!topRatedList[0] || topRatedList[0].data.page != topRatedPage)
      getTopRatedMovies(currentLang, topRatedPage).then((data) =>
        setTopRatedList([{ data: data, pageFunc: updateTRPage }])
      );
    if (!nowPlayingList[0] || nowPlayingList[0].data.page != nowPlayingPage)
      getNowPlaying(currentLang, nowPlayingPage).then((data) =>
        setNowPlayingList([{ data: data, pageFunc: updateNPPage }])
      );
    if (!upcomingList[0] || upcomingList[0].data.page != upcomingPage)
      getUpcoming(currentLang, upcomingPage).then((data) =>
        setUpcomingList([{ data: data, pageFunc: updateUpcPage }])
      );
  }, [popularPage, topRatedPage, nowPlayingPage, upcomingPage]);

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
