import { useState, useEffect } from "react";
import "./App.css";
import { getMovies } from "../lib/TMDb";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Catalog from "./Pages/Catalog";
import Details from "./Pages/Details";
import Add from "./Pages/Add";
import Update from "./Pages/Update";
import AboutUs from "./Pages/AboutUs";
import NotFoundPage from "./Pages/NotFoundPage";

const NUMBER_OF_ITEMS_PER_PAGE = 20;

function App() {
  const [currentLang, setCurrentLang] = useState("en-US");

  /*
---------- JOAO'S FEEDBACK ----------
Declaring only movies state and inside it keys for each category.
-------------------------------------
*/
  const [isLoading, setisLoading] = useState(true);
  const [movies, setMovies] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    nowPlaying: [],
  });
  const [activeCategory, setActiveCategory] = useState("popular");
  const [activePage, setActivePage] = useState(1);
  const [showItems, setShowItems] = useState([]);

  /*
---------- JOAO'S FEEDBACK ----------
If you have multiple async functions that you want to run in parallel, you can use Promise.all to run them concurrently.
This way, you can avoid nested and/or sequential calls.
-------------------------------------
*/
  useEffect(() => {
    if (isLoading) {
      getMovies(activeCategory, currentLang, 1).then((data) => {
        setMovies({ ...movies, [activeCategory]: data.results });
        setShowItems(data.results.slice(0, NUMBER_OF_ITEMS_PER_PAGE));
        setisLoading(false);
      });
    }
  }, []);

  const handlePageChange = async (direction) => {
    const isPrevious = direction === "previous";
    const isNext = direction === "next";
    const newPage = isPrevious ? activePage - 1 : activePage + 1;

    if (isPrevious && activePage === 1) return;

    if (
      isNext &&
      movies[activeCategory].length <= activePage * NUMBER_OF_ITEMS_PER_PAGE
    ) {
      setisLoading(true);

      const data = await getMovies(activeCategory, currentLang, newPage);

      const newMovies = {
        ...movies,
        [activeCategory]: [...movies[activeCategory], ...data.results],
      };

      setMovies(newMovies);

      const newShowItems = newMovies[activeCategory].slice(
        newPage * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE,
        newPage * NUMBER_OF_ITEMS_PER_PAGE
      );

      console.log(newShowItems);
      setShowItems(newShowItems);

      setActivePage(newPage);

      setisLoading(false);
    } else {
      setActivePage(newPage);
      setShowItems(
        movies[activeCategory].slice(
          newPage * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE,
          newPage * NUMBER_OF_ITEMS_PER_PAGE
        )
      );
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/catalog"
        element={
          <Catalog showItems={showItems} handlePageChange={handlePageChange} />
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
