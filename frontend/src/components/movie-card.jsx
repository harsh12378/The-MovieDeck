
import React from 'react';
import { getTrailerUrl } from "../utils/getTrailerUrl.js";
import {useState, useEffect} from 'react';
import { useContext } from "react";
import { WatchlistContext } from "../utils/watchListContext.jsx";

export default function({ movie, genreMap }){

  
const [loading, setLoading] = useState(true);
const { watchList, setWatchList } = useContext(WatchlistContext); // ✅ correct



  const handleWatchTrailer = async () => {
    const url = await getTrailerUrl(movie.id, import.meta.env.VITE_TMDB_API_KEY);
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Trailer not available");
    }
  };

   const inWatchlist = watchList.includes(movie.id);

  const handleAddToWatchlist =async (movieId)=>{
    const token=localStorage.getItem('token');
 if(!localStorage.getItem('token')){
  window.location.href='/Login';
  return;
  };
  try{
    const response= await fetch('http://localhost:5000/api/watchlist/add',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json',
         'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({movieId})
    })
    const data =await response.json();
    if(response.status===200){
      window.dispatchEvent(new Event("watchlistUpdated"));
        setWatchList((prev) => [...prev, movieId]);
    }
    else if(response.status===400){
      alert("Movie already in watchlist");
    }
   else {
    console.log('some error', data);
   }


  }catch(error){
    console.error("Error adding to watchlist:", error);
    
  }
  
}

const handleRemoveFromWatchlist = async (movieId) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log("No token found");
    return;
  }
  
  console.log("Removing movie ID:", movieId);
  
  try {
    const response = await fetch('http://localhost:5000/api/watchlist/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ movieId })
    });
    
    console.log("Response status:", response.status);
    
    const data = await response.json();
    console.log("Response data:", data);
    
    if (response.status === 200) {
      console.log("Movie removed successfully");
      setWatchList((prev) => prev.filter((id) => id !== movieId)); // Use !== instead of !=
    } else {
      console.log("Error removing movie:", data.message);
      // Optionally show error message to user
    }
    
  } catch (error) {
    console.log("Network error removing from list:", error);
  }
}

    return (
    
        <article key={movie.id} className="movie-card">
          <img
           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} className="movie-logo"
           />
          <h3>{movie.title}</h3>
          <p>
  Genres: {
    movie.genre_ids
      ? movie.genre_ids.map(id => genreMap[id]).join(", ")
      : movie.genres
        ? movie.genres.map(g => g.name).join(", ")
        : "Unknown"
  }
</p>

          <p>Language: {movie.original_language}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}/10</p>
          <p className="overview">Overview: {movie.overview?.slice(0,100)}...</p>
          <button onClick={handleWatchTrailer}>Watch Trailer</button>
         <button
          onClick={() =>
             inWatchlist
      ? handleRemoveFromWatchlist(movie.id)
      : handleAddToWatchlist(movie.id)
              }
           >
   {inWatchlist ? "Remove from list" : "Add to Watchlist"}
              </button>
          
        </article>
      );
    
};




