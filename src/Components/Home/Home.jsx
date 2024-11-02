import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { WatchlistContext } from "../../Context/WatchlistContext";
import { TokenContext } from "../../Context/TokenContext";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [isShowingMovies, setIsShowingMovies] = useState(true);
  const [rated, setRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isLoading, setisLoading] = useState(true);
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
  // Fetch movies, series, top-rated, and upcoming movies
  async function getMovies() {
    return await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=7ed0dce7265e624dc38e6c0da1a5ad4c"
    );
  }

  async function getSeries() {
    return await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=7ed0dce7265e624dc38e6c0da1a5ad4c"
    );
  }

  async function getRated() {
    return await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=7ed0dce7265e624dc38e6c0da1a5ad4c"
    );
  }

  async function getUpcoming() {
    return await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=7ed0dce7265e624dc38e6c0da1a5ad4c"
    );
  }
  const getOverviewText = () => {
    const words = featured.overview.split(" ");
    if (window.innerWidth < 640) {
      // For small screens (smaller than 640px)
      return words.slice(0, 20).join(" "); // Show fewer words on small screens
    } else {
      // For medium and large screens
      return words.slice(0, 38).join(" "); // Show more words on larger  screens
    }
  };
  // Fetch movies or series based on the state
  useEffect(() => {
    setisLoading(true);
    if (isShowingMovies) {
      getMovies()
        .then((response) => {
          setMovies(response.data.results);
          setFeatured(response.data.results[0]);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setisLoading(false);
        });
    } else {
      getSeries()
        .then((response) => {
          setSeries(response.data.results);
          setFeatured(response.data.results[0]);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setisLoading(false);
        });
    }
  }, [isShowingMovies]);

  // Fetch top-rated and upcoming movies
  useEffect(() => {
    getRated()
      .then((response) => {
        setRated(response.data.results);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });

    getUpcoming()
      .then((response) => {
        setUpcoming(response.data.results);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="text-center font-mono font-semibold text-2xl z-50 text-flicker-gradient ">
        Pulse into the Movie World
      </h1>
      <h2 className="flex flex-row flex-nowrap items-center mt-2 mb-2 text-2xl">
        <span className="flex-grow block border-t border-gray-700"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded-lg leading-none font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transition-transform transform hover:scale-105">
          <i className="fas fa-tags mr-2"></i>
          Trending Shows
        </span>
        <span className="flex-grow block border-t border-gray-700"></span>
      </h2>
      <div
        className="
    main-section 
    sm:min-h-[150vh] 
    md:min-h-[110vh]  
  "
      >
        {isLoading ? (
          <Loader />
        ) : (
          featured && (
            <div
              className="featured-bg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`,
              }}
            >
              <div className="overlay-content w-full h-3/4 text-center">
                <h1 className="featured-title pt-14">{featured.title}</h1>
                <div className="flex">
                  <p className="featured-description text-white text-center font-semibold text-2xl lg:ps-0 sm:ps-0 md:ps-0">
                    {getOverviewText()}
                    {featured.overview.split(" ").length >
                      (window.innerWidth < 640 ? 20 : 38) && "..."}
                  </p>
                </div>
                {/* Button to toggle between movies and series */}
                <div className="action-buttons">
                  {isShowingMovies ? (
                    <button
                      className="btn-see-series bg-blue-500 text-white px-4 py-2 me-4 border-r-2 cursor-pointer border-none text-md rounded-md transition-colors"
                      onClick={() => setIsShowingMovies(false)}
                    >
                      See Popular Series
                    </button>
                  ) : (
                    <button
                      className="btn-see-movies bg-blue-500 text-white px-4 py-2 me-4 border-r-2 cursor-pointer border-none text-md rounded-md transition-colors"
                      onClick={() => setIsShowingMovies(true)}
                    >
                      See Popular Movies
                    </button>
                  )}
                  {addedItems.includes(featured.id) ? (
                    <button
                      className="btn-added bg-gray-400 text-white px-4 py-2 me-4 cursor-not-allowed"
                      disabled
                    >
                      Added
                    </button>
                  ) : (
                    <button
                      className="btn-add-to-watchlist bg-green-500 text-white px-4 py-2 me-4"
                      onClick={() => handleAddToWatchlist(featured)}
                    >
                      Add to Watchlist
                    </button>
                  )}
                </div>
                <Link to={`Details/${featured.id}`}>
                  <button
                    key={featured.id}
                    className="btn-see-series bg-gray-600 text-yellow-400 font-semibold px-4 py-2 mt-3 me-4 border-r-2 cursor-pointer border-none text-md rounded-md  hover:bg-blue-500"
                  >
                    Read More
                  </button>
                </Link>
              </div>

              <div className="carousel-section">
                <div className="carousel-container ">
                  {isShowingMovies
                    ? movies.map((movie) => (
                        <div
                          key={movie.id}
                          className="carousel-card"
                          onClick={() => setFeatured(movie)}
                        >
                          <img
                            className="carousel-image"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </div>
                      ))
                    : series.map((show) => (
                        <div
                          key={show.id}
                          className="carousel-card"
                          onClick={() => setFeatured(show)}
                        >
                          <img
                            className="carousel-image"
                            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                            alt={show.name}
                          />
                        </div>
                      ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Top Rated Section */}
      <div className="Top-Rated">
        <h2 className="flex flex-row flex-nowrap items-center pt-5 mb-2 text-2xl">
          <span className="flex-grow block border-t border-gray-700"></span>
          <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded-lg leading-none font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transition-transform transform hover:scale-105">
            <i className="fas fa-tags mr-2"></i>
            Top Rated Shows
          </span>
          <span className="flex-grow block border-t border-gray-700"></span>
        </h2>
        <div className="relative flex overflow-x-auto space-x-4 p-5">
          {isLoading ? (
            <Loader />
          ) : (
            rated.map((item) => (
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
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upcoming Section */}
      <div className="upcoming">
        <div className="content">
          <h2 className="flex flex-row flex-nowrap items-center mt-2 mb-2 text-2xl">
            <span className="flex-grow block border-t border-gray-700"></span>
            <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded-lg leading-none font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transition-transform transform hover:scale-105">
              <i className="fas fa-tags mr-2"></i>
              Upcoming Shows
            </span>
            <span className="flex-grow block border-t border-gray-700"></span>
          </h2>

          <div className="relative flex overflow-x-auto space-x-4 p-5">
            {isLoading ? (
              <Loader />
            ) : (
              upcoming.map((movie) => (
                <div
                  key={movie.id}
                  className="min-w-[250px] max-w-xs w-full bg border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[500px] flex-shrink-0"
                >
                  <img
                    className="rounded-t-lg h-64 w-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <span className="absolute ps-14 pt-5 flex w-72">
                    <span className="text-blue-300">Release Date :</span> 🎬{" "}
                    {movie.release_date}
                  </span>
                  <div className="p-5 pt-16 text-white text-center">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-white">
                        {movie.title}
                      </h5>
                    </a>
                    <div className="flex flex-col">
                      <Link to={`Details/${movie.id}`}>
                        <button
                          key={movie.id}
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
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
