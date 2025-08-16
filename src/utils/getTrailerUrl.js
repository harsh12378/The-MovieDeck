export async function getTrailerUrl(movieId, apiKey) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
  const data = await res.json();

  const trailer = data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  if (trailer) {
    return `https://www.youtube.com/watch?v=${trailer.key}`;
  } else {
    return null; // No trailer found
  }
}
