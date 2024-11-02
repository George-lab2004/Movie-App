import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CgArrowLongLeftL, CgArrowLongRightL } from "react-icons/cg";
import { TokenContext } from "../../Context/TokenContext";
import { WatchlistContext } from "../../Context/WatchlistContext";
import Loader from "../Loader/Loader";

export default function Search() {
  const { inputValue } = useParams(); // Get the inputValue from URL
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const { addToWatchlist } = useContext(WatchlistContext);
  const [addedItems, setAddedItems] = useState([]);
  const { token } = useContext(TokenContext);
  const handleAddToWatchlist = (item) => {
    if (!token) {
      alert("You must be logged in to add items to your watchlist.");
      return;
    }
    addToWatchlist(item);
    setAddedItems((prevItems) => [...prevItems, item.id]);
  };
  // Fetch search results
  const { data, isError, isLoading } = useQuery({
    queryKey: ["search", inputValue, page], // Add page to query key
    queryFn: async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=7ed0dce7265e624dc38e6c0da1a5ad4c&query=${inputValue}&page=${page}`
      );
      setTotalPages(response.data.total_pages); // Update total pages
      return response.data.results; // Return results directly
    },
  });

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // Loading and error states
  if (isLoading)
    return (
      <p>
        <Loader />
      </p>
    );
  if (isError) return <p>Error fetching movies.</p>;

  return (
    <div className="Movies">
      <h2 className="flex flex-row flex-nowrap items-center pt-5 mb-2 text-2xl">
        <span className="flex-grow block border-t border-gray-700"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded-lg leading-none font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transition-transform transform hover:scale-105">
          <i className="fas fa-tags mr-2"></i>
          Search result
        </span>
        <span className="flex-grow block border-t border-gray-700"></span>
      </h2>

      <div className="flex justify-center mb-4">
        <span className="text-lg font-medium text-blue-500">
          Page {page} of {totalPages}
        </span>
      </div>

      <div className="relative flex flex-wrap justify-center space-x-4 p-5">
        {data?.map((item) => (
          <div
            key={item.id}
            className="min-w-[250px] max-w-xs w-full bg border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[500px] flex-shrink-0 mx-2 mb-4"
          >
            <img
              className="rounded-t-lg h-64 w-full object-cover"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={
                item.media_type === "tv"
                  ? item.original_name
                  : item.original_title
              }
            />
            <span className="absolute ps-14 pt-5 flex w-72">
              <span className="text-blue-300">Rating :</span> ⭐{" "}
              {item.vote_average}
            </span>
            <div className="p-5 pt-16 text-white text-center">
              <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-white">
                {item.media_type === "tv"
                  ? item.original_name
                  : item.original_title}
              </h5>
              <Link to={`Details/${item.id}`}>
                <button className="inline-flex w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-xl hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 hover:text-yellow-300 hover:font-semibold dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center items-center mb-5">
                  Read more
                  <svg
                    className="w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </Link>
              {addedItems.includes(item.id) ? (
                <button
                  className="btn-added bg-gray-400 text-white px-4 py-2 me-4 cursor-not-allowed"
                  disabled
                >
                  Added
                </button>
              ) : (
                <button
                  className="inline-flex w-full px-3 py-2 text-sm text-blue-400 font-medium text-center bg-gray-800 rounded-xl hover:bg-blue-700 focus:ring-4 hover:text-yellow-300 hover:font-semibold focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center items-center"
                  onClick={() => handleAddToWatchlist(item)}
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-5 space-x-4">
        <button
          className="flex items-center py-2 px-3 rounded font-medium select-none border text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white"
          onClick={handlePrevPage}
          disabled={page === 1} // Disable button if on the first page
        >
          <CgArrowLongLeftL size={20} />
          Previous Page
        </button>
        <button
          className="flex items-center py-2 px-3 rounded font-medium select-none border text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white"
          onClick={handleNextPage}
          disabled={page >= totalPages} // Disable button if on the last page
        >
          <CgArrowLongRightL size={20} />
          Next Page
        </button>
      </div>
    </div>
  );
}
