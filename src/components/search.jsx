import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from './movie-card';
import genreMap from './genres.json'
export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);

      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=hi-IN`
      );
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-results">
      {loading && <p>Loading...</p>}
      {results.length === 0 && !loading ? (

        <p>No results found for "{query}".</p>

      ) :  (
        <>
        <p className="related-result">Related results:</p>
        <div className="home-body">
            
       { results.map(movie => (
           <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
        ))}
       </div>
       </>
      )}
    </div>
  );
}
