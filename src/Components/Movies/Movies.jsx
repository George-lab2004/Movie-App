import { CgArrowLongLeftL } from "react-icons/cg";
import { CgArrowLongRightL } from "react-icons/cg";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { WatchlistContext } from "../../Context/WatchlistContext";
import Loader from "../Loader/Loader";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [number, setNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Track total pages
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
  // Fetch movies from the TMDB API
  async function getMovies(newNumber) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=7ed0dce7265e624dc38e6c0da1a5ad4c&page=${newNumber}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages); // Set total pages
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function nextPage() {
    const newNumber = number + 1;
    if (newNumber <= totalPages) {
      setNumber(newNumber);
      getMovies(newNumber);
    }
  }

  function prevPage() {
    const newNumber = number - 1;
    if (newNumber > 0) {
      setNumber(newNumber);
      getMovies(newNumber);
    }
  }

  useEffect(() => {
    getMovies(number); // Pass the current page number
  }, [number]); // Add number as a dependency to call when it changes

  if (isLoading) {
    return (
      <p>
        <Loader />
      </p>
    );
  }

  if (error) {
    return <p>Error fetching movies: {error}</p>;
  }

  return (
    <div className="Movies">
      <h2 className="flex flex-row flex-nowrap items-center pt-5 mb-2 text-2xl">
        <span className="flex-grow block border-t border-gray-700"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded-lg leading-none font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transition-transform transform hover:scale-105">
          <i className="fas fa-tags mr-2"></i>
          Movies{" "}
        </span>
        <span className="flex-grow block border-t border-gray-700"></span>
      </h2>

      <div className="flex justify-center mb-4">
        <span className="text-lg font-medium text-blue-500">
          Page {number} of {totalPages}
        </span>
      </div>

      <div className="relative flex flex-wrap justify-center space-x-4 p-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[250px] max-w-xs w-full bg border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[500px] flex-shrink-0 mx-2 mb-4"
          >
            <img
              className="rounded-t-lg h-64 w-full object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
            />
            <span className="absolute ps-14 pt-5 flex w-72">
              <span className="text-blue-300">Rating :</span> ⭐{" "}
              {movie.vote_average}
            </span>
            <div className="p-5 pt-16 text-white text-center">
              <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-white">
                {movie.original_title}
              </h5>
              <div className="flex flex-col">
                <Link to={`Details/${movie.id}`}>
                  <button
                    className="inline-flex w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-xl hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 hover:text-yellow-300 hover:font-semibold dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center items-center mb-5"
                    onClick={() => console.log(`Movie ID: ${movie.id}`)} // Log movie ID here
                  >
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

                {addedItems.includes(movie.id) ? (
                  <button
                    className="btn-added bg-gray-400 text-white px-4 py-2 me-4 cursor-not-allowed"
                    disabled
                  >
                    Added
                  </button>
                ) : (
                  <button
                    className="inline-flex w-full px-3 py-2 text-sm text-blue-400 font-medium text-center bg-gray-800 rounded-xl hover:bg-blue-700 focus:ring-4 hover:text-yellow-300 hover:font-semibold focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center items-center"
                    onClick={() => handleAddToWatchlist(movie)}
                  >
                    Add to Watchlist
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-5 space-x-4">
        <button
          className="flex items-center py-2 px-3 rounded font-medium select-none border text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white"
          onClick={prevPage}
          disabled={number === 1} // Disable button if on the first page
        >
          <CgArrowLongLeftL size={20} />
          Previous Page
        </button>
        <button
          className="flex items-center py-2 px-3 rounded font-medium select-none border text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white"
          onClick={nextPage}
          disabled={number >= totalPages} // Disable button if on the last page
        >
          <CgArrowLongRightL size={20} />
          Next Page
        </button>
      </div>
    </div>
  );
}
