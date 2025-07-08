async function searchMovie() {
  const movieName = document.getElementById("movie-input").value.trim();
  const movieDetails = document.getElementById("movie-details");
  const loader = document.getElementById("loader");

  if (!movieName) {
    movieDetails.innerHTML = `<p>Please enter a movie name.</p>`;
    return;
  }

  // Show loader, clear old data
  loader.style.display = "block";
  movieDetails.innerHTML = "";

  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=1a3e35ad`);
    const data = await response.json();

    loader.style.display = "none"; // Hide loader after response

    if (data.Response === "False") {
      movieDetails.innerHTML = `<p>🎬 Movie not found. Try again.</p>`;
      return;
    }

    const poster = data.Poster !== "N/A"
      ? data.Poster
      : "https://via.placeholder.com/200x300?text=No+Image";

    movieDetails.innerHTML = `
      <img src="${poster}" alt="Poster">
      <div>
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>IMDB Rating:</strong> ⭐ ${data.imdbRating}</p>
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(data.Title)}+trailer" 
           target="_blank">
          <button class="trailer-btn">▶️ Watch Trailer</button>
        </a>
      </div>
    `;
  } catch (error) {
    loader.style.display = "none";
    movieDetails.innerHTML = `<p>⚠️ Something went wrong. Try again later.</p>`;
    console.error("Error fetching data:", error);
  }
}

