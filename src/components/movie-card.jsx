
import React from 'react';

export default function({ movie, genreMap }){


    return (
    
        <article key={movie.id} className="movie-card">
          <img
           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} className="movie-logo"
           />
          <h3>{movie.title}</h3>
          <p>
            Genres: {movie.genre_ids.map(id => genreMap[id]).join(", ")}
          </p>
          <p>Language: {movie.original_language}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}/10</p>
          <p className="overview">Overview: {movie.overview?.slice(0,100)}...</p>
          <button>Watch Trailer</button>
          <button>Add to Watchlist</button>
        </article>
      );
    
    }
    
    




