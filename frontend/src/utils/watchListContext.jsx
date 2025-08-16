import { createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]); // IDs

  // ✅ fetch IDs once when app loads
  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/watchlist/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("Watchlist fetch data:", data);
        
        if (res.status === 200 && Array.isArray(data.watchList)) {
          setWatchList(data.watchList); // ✅ Fixed: use data.watchList to match API response
        }
      } catch (err) {
        console.error("Failed fetching watchlist:", err);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <WatchlistContext.Provider value={{ watchList, setWatchList }}>
      {children}
    </WatchlistContext.Provider>
  );
};