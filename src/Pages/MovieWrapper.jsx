import { useEffect, useState } from "react";
import Card from "../Components/Card";
import "./MovieWrapper.css";

const NUMBER_OF_ITEMS_PER_PAGE = 4;

export default function MovieWrap({ h4, data, getMoreData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true); // Track if there's more data to fetch

  useEffect(() => {
    const fetchPageData = async () => {
      // Calculate start and end indices
      const startIndex = (currentPage - 1) * NUMBER_OF_ITEMS_PER_PAGE;
      const endIndex = currentPage * NUMBER_OF_ITEMS_PER_PAGE;

      // If the data is already loaded
      if (data.length > startIndex) {
        const newData = data.slice(startIndex, endIndex);
        setDisplayData(newData);

        // Check if more data is needed
        if (endIndex >= data.length && hasMoreData) {
          const moreData = await getMoreData(currentPage);
          if (moreData && moreData.length > 0) {
            setHasMoreData(true);
          } else {
            setHasMoreData(false); // No more data to fetch
          }
        }
      } else {
        // Fetch data if not available
        await getMoreData(currentPage);
      }
    };

    fetchPageData();
  }, [data, currentPage, getMoreData, hasMoreData]);

  const handleNextPage = async () => {
    if (hasMoreData) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  const handlePageChange = async (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="movie-wrap">
      <h4>{h4}</h4>
      <div className="buttons">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="arrows">{"<"}</button>
        <p style={{fontWeight: "bold"}}>Page: {currentPage}</p>
        <button onClick={handleNextPage} disabled={!hasMoreData} className="arrows">{">"}</button>
        <button onClick={() => handlePageChange(currentPage + 10)} disabled={!hasMoreData}>Next 10 Pages</button>
        <button onClick={() => handlePageChange(currentPage - 10)} disabled={currentPage <= 10}>Previous 10 Pages</button>
      </div>
      <div className="movie">
        {displayData.map((movie, index) => (
          <div className="card" key={index}>
            <Card movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
