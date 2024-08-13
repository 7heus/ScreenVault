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
import Navbar from "./Components/Navbar";
import SearchResults from "./Pages/SearchResults";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import RandomMovie from "./Components/RandomMovie";

function App() {
  const [currentLang, setCurrentLang] = useState("en-US");
  const [popularList, setPopularList] = useState(null);
  const [topRatedList, setTopRatedList] = useState(null);
  const [nowPlayingList, setNowPlayingList] = useState(null);
  const [upcomingList, setUpcomingList] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularData = await getPopularMovies(currentLang, 1);
        const topRatedData = await getTopRatedMovies(currentLang, 1);
        const nowPlayingData = await getNowPlaying(currentLang, 1);
        const upcomingData = await getUpcoming(currentLang, 1);

        setPopularList([{ data: popularData }]);
        setTopRatedList([{ data: topRatedData }]);
        setNowPlayingList([{ data: nowPlayingData }]);
        setUpcomingList([{ data: upcomingData }]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentLang]);

  const setSidebar = () => setSidebarActive(!sidebarActive);

  if (loading) {
    return <div>Loading...</div>; // Global loading indicator
  }

  return (
    <>
      <Navbar callback={setSidebar} />
      <Sidebar boolean={sidebarActive} />
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
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="/random"
          element={
            <RandomMovie
              popular={popularList}
              topRated={topRatedList}
              nowPlaying={nowPlayingList}
              upcoming={upcomingList}
            />
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
