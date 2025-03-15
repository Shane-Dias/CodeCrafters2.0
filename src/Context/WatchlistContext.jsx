import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([
    "INFY",
    "TCS",
    "RELIANCE",
    "HDFC",
  ]);

  return (
    <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
