import React, { createContext, useState, useEffect } from "react";

// Create Context
export const WatchlistContext = createContext();

// Provider Component
// eslint-disable-next-line react/prop-types
export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from local storage on mount
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  }, []);

  // Function to add to watchlist
  const addToWatchlist = (item) => {
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = [...prevWatchlist, item];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  // Function to remove from watchlist
  const removeFromWatchlist = (itemId) => {
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = prevWatchlist.filter(
        (item) => item.id !== itemId
      );
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
