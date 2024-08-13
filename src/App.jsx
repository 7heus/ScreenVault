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

  /*
---------- JOAO'S FEEDBACK ----------
This function works for both previous and next page changes.
It will only request more moveis from the api if you have no state to show.
Now what you need to imnplement is the:
- Error handling
- Active Category change (probably it will be better to do so in another function
-------------------------------------
*/
  const handlePageChange = async (direction) => {
    const isPrevious = direction === "previous";
    const isNext = direction === "next";
    // Calculate the new page
    const newPage = isPrevious ? activePage - 1 : activePage + 1;

    // Safeguard to prevent going lower than page 1
    if (isPrevious && activePage === 1) return;

    // Find the start and end index of the new page
    const startIndex =
      newPage * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE;
    const endIndex = newPage * NUMBER_OF_ITEMS_PER_PAGE;
    // Get the current movies for the active category
    const currentMovies = movies[activeCategory];

    // If the next page is requested and the current movies array is smaller than the end index of the new page then fetch new movies
    if (
      isNext &&
      movies[activeCategory].length <= activePage * NUMBER_OF_ITEMS_PER_PAGE
    ) {
      setisLoading(true);

      // Try to fetch new movies
      try {
        const data = await getMovies(activeCategory, currentLang, newPage);

        const newMovies = {
          ...movies,
          [activeCategory]: [...currentMovies, ...data.results],
        };

        setMovies(newMovies);

        const newShowItems = newMovies[activeCategory].slice(
          startIndex,
          endIndex
        );

        setShowItems(newShowItems);
      } catch (error) {
        /*
          TODO: Error handling 
        */
      } finally {
        // Set loading to false, regardless of the outcome of the fetch
        setisLoading(false);
      }
    } else {
      setShowItems(movies[activeCategory].slice(startIndex, endIndex));
    }

    // Set the active page
    setActivePage(newPage);
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
            page={activePage}
            handlePageChange={handlePageChange}
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
