import { BiSearchAlt2 } from "react-icons/bi";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Icon from "../../assets/icon.webp";
import { TokenContext } from "../../Context/TokenContext";
import "animate.css"; // Importing animate.css

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State to store input value
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state on input change
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    settoken(null);
    navigate("/login");
  }
  let { token, settoken } = useContext(TokenContext);

  return (
    <nav className="z-50 bg-black text-white border-gray-200 dark:bg-gray-900 relative">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4 text-white">
        {/* Logo and Search */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <NavLink to={""} className="flex">
            <img width="50" height="50" src={Icon} alt="pulse" />
            <span className="text-blue-700 self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
              MPL
            </span>
          </NavLink>

          {/* Mobile Menu Button */}
          <div className="flex items-center justify-end w-full md:hidden relative mt-4">
            {/* Right Button - Search Icon */}
            <Link
              to={`search/${inputValue}`}
              className="p-2 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg z-[100] "
            >
              <BiSearchAlt2 size={24} />
              <span className="sr-only">Search</span>
            </Link>

            {/* Left Button - Menu Icon */}
            <button
              onClick={toggleMenu}
              className="p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none z-[100]"
              aria-controls="navbar-collapse"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar for Larger Screens */}
        <div className="hidden md:flex flex-grow justify-center mx-4 relative">
          <input
            type="text"
            id="search-navbar"
            onChange={handleInputChange}
            className="block w-full p-3 pr-12 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Movies..."
          />
          <NavLink
            to={`search/${inputValue}`}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 
      ${
        inputValue.trim() ? "text-gray-500" : "text-gray-300 cursor-not-allowed"
      }
      dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 
      focus:outline-none focus:ring-4 focus:ring-gray-200 
      dark:focus:ring-gray-700 rounded-lg p-2 z-[100]`}
            onClick={(e) => {
              if (!inputValue.trim()) e.preventDefault(); // Prevent navigation if input is empty
            }}
          >
            <BiSearchAlt2 size={24} />
            <span className="sr-only">Search for Movies</span>
          </NavLink>
        </div>

        {/* Search Button for Small Screens */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => {
              if (inputValue.trim()) {
                // Perform search action, e.g., navigate to search route
              }
            }}
            className={`p-2 text-sm rounded-lg ${
              inputValue.trim()
                ? "text-gray-500 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed"
            } focus:outline-none z-[100]`}
            disabled={!inputValue.trim()} // Disable button if input is empty
          >
            <BiSearchAlt2 size={24} />
            <span className="sr-only">Search for Movies</span>
          </button>
        </div>

        {/* Combined Nav Links with Fullscreen and Animation */}
        <div
          className={`${
            isOpen
              ? "fixed w-full h-full top-0 left-0 bg-black z-50 flex flex-col items-center animate__animated animate__fadeInDown"
              : "hidden"
          } md:flex md:flex-row md:space-x-8 space-y-4 md:space-y-0 p-4 md:p-0 z-50 md:relative`}
          id="navbar-collapse"
        >
          {/* Mobile Search Bar */}
          <div className="block md:hidden w-full p-4">
            <input
              type="text"
              id="search-navbar-mobile"
              className="block w-full p-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 rtl:space-x-reverse font-medium">
            {token ? (
              <li>
                <a
                  onClick={() => logout()}
                  href=""
                  className="block px-4 py-2 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <NavLink
                  to={"Login"}
                  className="block py-2 px-4 text-lg text-white rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Login
                </NavLink>
              </li>
            )}
            {token ? (
              <li>
                <NavLink
                  to={"wishlist"}
                  className="block px-4 py-2 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  WatchList
                </NavLink>
              </li>
            ) : null}

            <li>
              <NavLink
                to={"Movies"}
                className="block py-2 px-4 text-lg text-white rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"Tv-Series"}
                className="block py-2 px-4 text-lg text-white rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Tv-Series
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
