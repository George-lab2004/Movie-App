import { BiTrash } from "react-icons/bi";
import React, { useContext } from "react";
import { WatchlistContext } from "../../Context/WatchlistContext"; // Ensure this path is correct
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center font-mono font-semibold text-3xl mb-6 text-gray-800">
        Your Watchlist
      </h1>
      {watchlist.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No items in your watchlist.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((item) => (
            <div
              key={item.id}
              className="min-w-[250px] max-w-xs w-full bg border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[500px] flex-shrink-0"
            >
              <img
                className="rounded-t-lg h-64 w-full object-cover"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.original_title}
              />
              <span className="absolute ps-14 pt-5 flex w-72">
                <span className="text-blue-300">Rating :</span> ⭐{" "}
                {item.vote_average}
              </span>
              <div className="p-5 pt-16 text-white text-center">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-white">
                    {item.original_title}
                  </h5>
                </a>
                <div className="flex flex-col">
                  <Link to={`Details/${item.id}`}>
                    <button
                      key={item.id}
                      className="inline-flex w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-xl hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 hover:text-yellow-300 hover:font-semibold dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center items-center mb-5"
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
                  <button
                    onClick={() => removeFromWatchlist(item.id)}
                    className="inline-flex w-full px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-xl hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 hover:text-yellow-300 hover:font-semibold dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center items-center mb-5"
                  >
                    Remove
                    <BiTrash size={30} className="ps-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
