import { useEffect, useState } from "react";
import Card from "../Components/Card";
const NUMBER_OF_ITEMS_PER_PAGE = 4;
export default function MovieWrap({ h4, data, getMoreData, moreData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    const startIndex =
      currentPage * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE;
    const endIndex = currentPage * NUMBER_OF_ITEMS_PER_PAGE;
    setDisplayData(data.slice(startIndex, endIndex));
  }, [data]);
  const handleNextPage = async () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    // if items in state are enough to display, otherwise fetch more
    if (data.length > newPage * NUMBER_OF_ITEMS_PER_PAGE) {
      const startIndex =
        newPage * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE;
      const endIndex = newPage * NUMBER_OF_ITEMS_PER_PAGE;
      setDisplayData(data.slice(startIndex, endIndex));
    } else {
      moreData ? await getMoreData(newPage) : console.log("done");
    }
  };
  const handlePrevPage = () => {
    if (currentPage === 1) return;
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    const startIndex =
      newPage * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE;
    const endIndex = newPage * NUMBER_OF_ITEMS_PER_PAGE;
    setDisplayData(data.slice(startIndex, endIndex));
  };
  return (
    <div className="movie-wrap">
      <h4>{h4}</h4>
      <div className="buttons" style={{ border: "none", borderStyle: "none" }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1 ? true : false}
        >
          {"<"}
        </button>
        <p>Page: {currentPage}</p>
        <button
          onClick={handleNextPage}
          disabled={data.length < NUMBER_OF_ITEMS_PER_PAGE ? true : false}
        >
          {">"}
        </button>
      </div>
      <div className="movie">
        {displayData.map((movie, index) => {
          return (
            <div className="card" key={index}>
              <Card movie={movie} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
