import { useState, useEffect, useContext, useMemo } from "react";
import Scroll from "./scroll";
import MovieCard from "./movie-card";
import genreMap from "./genres.json";
import { WatchlistContext } from "../utils/watchListContext.jsx";

export default function WatchList() {
  const { watchList } = useContext(WatchlistContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Convert watchList to string for stable dependency comparison
  const watchListString = useMemo(() => 
    watchList ? JSON.stringify(watchList) : '', 
    [watchList]
  );

  useEffect(() => {
    if (!watchList || watchList.length === 0) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;

      try {
        const movieDetails = await Promise.all(
          watchList.map(id =>
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
              .then(res => res.json())
          )
        );
        
        setMovies(movieDetails);
      } catch (err) {
        console.error("Failed fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [watchListString]); // Use stable string dependency

  Scroll(() => setMovies(prev => prev.concat([])), loading);

  if (!watchList || watchList.length === 0) {
    return (
      <div className="home-body">
        <p>Your watchlist is empty. Add some movies!</p>
      </div>
    );
  }

  return (
    <div className="home-body">
      {movies.length > 0 && movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
      ))}
      
      {loading && <p className="loading">Loading your movies...</p>}
    </div>
  );
}