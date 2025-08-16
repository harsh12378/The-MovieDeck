
import {useState, useEffect} from 'react';
import genreMap from "./genres.json"
import MovieCard from './movie-card';
import Scroll from './scroll';

export default function Body() {
    const [movies, setMovies] = useState([]);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(false) ;

    useEffect(() => {

            const fetchMovies = async () => {
          setLoading(true);
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            const res= await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&region=IN&page=${page}`);
            const data = await res.json();
            setMovies(prev=>[...prev,...data.results]);
           
            setLoading(false);
        };

        fetchMovies();
    }, [page]);

   Scroll(() => setPage(prev => prev + 1), loading);


    
  return (
    <div className="home-body">
      {movies.map((movie) => (
         <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
      ))}
      {loading &&<p className='loading'>Loading movies for you..</p>}
    </div>
  );
}





