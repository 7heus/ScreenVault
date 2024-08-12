import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { getPopularMovies } from "../lib/TMDb";
import HomePage from "./Pages/HomePage";
import Catalog from "./Pages/Catalog";
import Details from "./Pages/Details";
import Add from "./Pages/Add";
import Update from "./Pages/Update";
import AboutUs from "./Pages/AboutUs";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Catalog" element={<Catalog />} />
      <Route path="/Catalog/Details" element={<Details />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/Update" element={<Update />} />

      <Route path="/AboutUs" element={<AboutUs />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
