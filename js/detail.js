
    const API_KEY = "6d9225fc";
    const params = new URLSearchParams(window.location.search);
    const movieTitle = params.get("title");

    async function fetchMovieDetails() {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieTitle)}&plot=full`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        document.getElementById("backdrop").style.backgroundImage = `url('${data.Poster}')`;

        const actors = data.Actors.split(", ").map(actor => `<span>${actor}</span>`).join("");

        document.getElementById("movie-details").innerHTML = `
          <img src="${data.Poster}" alt="${data.Title}" class="movie-poster shadow-lg">
          <div class="movie-meta">
            <h2 class="text-danger mb-3">${data.Title} (${data.Year})</h2>
            <p><strong>🎭 Genre:</strong> ${data.Genre}</p>
            <p><strong>⭐ IMDb Rating:</strong> ${data.imdbRating}</p>
            <p><strong>🎬 Director:</strong> ${data.Director}</p>
            <p><strong>🖊️ Writer:</strong> ${data.Writer}</p>
            <div class="mt-3">
              <h5 class="info-title">Main Cast</h5>
              <div class="cast-list">${actors}</div>
            </div>
            <div class="mt-4">
              <h5 class="info-title">Plot</h5>
              <p>${data.Plot}</p>
            </div>
            <div class="mt-4">
              <h5 class="info-title">Country</h5>
              <p>${data.Country}</p>
              <h5 class="info-title mt-3">Language</h5>
              <p>${data.Language}</p>
              <h5 class="info-title mt-3">Awards</h5>
              <p>${data.Awards}</p>
            </div>
          </div>
        `;
      } else {
        document.getElementById("movie-details").innerHTML = `<p class="text-danger">Movie not found 😢</p>`;
      }
    }

    fetchMovieDetails();

  