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

  const handlePreviousPage = async () => {
    // Check if it's the first page, otherwise just show the previous page
    if (activePage === 1) return;

    setActivePage(activePage - 1);
    setShowItems(
      movies[activeCategory].slice(
        (activePage - 1) * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE,
        (activePage - 1) * NUMBER_OF_ITEMS_PER_PAGE
      )
    );
  };

  const handleNextPage = async () => {
    // Check if it's necessary to fetch more movies, otherwise just show the next page
    if (
      movies[activeCategory].length <=
      activePage * NUMBER_OF_ITEMS_PER_PAGE
    ) {
      setisLoading(true);

      const data = await getMovies(activeCategory, currentLang, activePage + 1);

      const newMovies = {
        ...movies,
        [activeCategory]: [...movies[activeCategory], ...data.results],
      };

      setMovies(newMovies);

      const newShowItems = newMovies[activeCategory].slice(
        (activePage + 1) * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE,
        (activePage + 1) * NUMBER_OF_ITEMS_PER_PAGE
      );

      setShowItems(newShowItems);

      setActivePage(activePage + 1);

      setisLoading(false);
    } else {
      setActivePage(activePage + 1);
      setShowItems(
        movies[activeCategory].slice(
          activePage * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE,
          activePage * NUMBER_OF_ITEMS_PER_PAGE
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
          <Catalog
            showItems={showItems}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
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
