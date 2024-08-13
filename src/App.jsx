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

const NUMBER_PER_PAGE = 20;

function App() {
  const [currentLang, setCurrentLang] = useState("en-US");
  const [popularList, setPopularList] = useState(null);
  const [topRatedList, setTopRatedList] = useState(null);
  const [nowPlayingList, setNowPlayingList] = useState(null);
  const [upcomingList, setUpcomingList] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPagePopular, setCurrentPagePopular] = useState(1);
  const [currentPageTopRated, setCurrentPageTopRated] = useState(1);
  const [currentPageNowPlaying, setCurrentPageNowPlaying] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);

  const fetchData = async () => {
    try {
      const popularData = await getPopularMovies(
        currentLang,
        currentPagePopular
      );
      const topRatedData = await getTopRatedMovies(
        currentLang,
        currentPageTopRated
      );
      const nowPlayingData = await getNowPlaying(
        currentLang,
        currentPageNowPlaying
      );
      const upcomingData = await getUpcoming(currentLang, currentPageUpcoming);

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

  useEffect(() => {
    fetchData();
  }, [
    currentLang,
    currentPagePopular,
    currentPageTopRated,
    currentPageNowPlaying,
    currentPageUpcoming,
  ]);

  const setSidebar = () => setSidebarActive(!sidebarActive);

  const handlePrevPage = (setCurrentPage, currentPage) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (setCurrentPage, currentPage) => {
    setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar callback={setSidebar} />
      <Sidebar boolean={!loading && sidebarActive} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/catalog"
          element={
            <Catalog
              popular={popularList && popularList}
              topRated={topRatedList && topRatedList}
              nowPlaying={nowPlayingList && nowPlayingList}
              upcoming={upcomingList && upcomingList}
              currentPagePopular={currentPagePopular}
              currentPageNowPlaying={currentPageNowPlaying}
              currentPageTopRated={currentPageTopRated}
              currentPageUpcoming={currentPageUpcoming}
              setCurrentPageNowPlaying={setCurrentPageNowPlaying}
              setCurrentPagePopular={setCurrentPagePopular}
              setCurrentPageTopRated={setCurrentPageTopRated}
              setCurrentPageUpcoming={setCurrentPageUpcoming}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              fetch={fetchData}
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
