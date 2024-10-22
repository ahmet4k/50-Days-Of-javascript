// Define API URLs and tokens at the top for easy maintenance
const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=ede5d264ab64d8aae0847951119a95ac"; // API key included
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=ede5d264ab64d8aae0847951119a95ac&query=";
const CHANGES_API = "https://api.themoviedb.org/3/movie/changes?page=1";
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGU1ZDI2NGFiNjRkOGFhZTA4NDc5NTExMTlhOTVhYyIsIm5iZiI6MTcyOTYwMzE2Ni4zODk3MjUsInN1YiI6IjY3MTc5ODg4NWU5ZDZmNWQwZDQ4ZjVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z7UgqEeTbqzl5ctEWX0nQmVuCtEvi9IP9jjfWq1FPss"; // Bearer token included
const IMG_PATH = "https://image.tmdb.org/t/p/w500"; // Base image URL

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

// Fetch movie changes
async function getMovieChanges() {
  try {
    const res = await fetch(CHANGES_API, options);
    if (!res.ok)
      throw new Error("Network response was not ok " + res.statusText);
    const data = await res.json();
    console.log(data); // Handle the changes data as needed
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// Initial fetch for popular movies
getMovies(API_URL);
getMovieChanges();

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// Fetch and display movies
async function getMovies(url) {
  try {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error("Network response was not ok " + res.statusText);
    const data = await res.json();
    console.log(data.results);
    showMovies(data.results);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// Event listener for the search form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

// Display movies on the page
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${IMG_PATH}${
      poster_path || "default-image.jpg"
    }" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>${title} <small>Overview</small></h3>
        <p>${overview}</p>
        <button class="details-btn" data-id="${id}">View Details</button>
      </div>
    `;

    main.appendChild(movieEl);
  });

  // Add event listener to detail buttons
  const detailButtons = document.querySelectorAll(".details-btn");
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const movieId = button.getAttribute("data-id");
      getMovieDetails(movieId);
    });
  });
}

// Fetch and display movie details
async function getMovieDetails(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ede5d264ab64d8aae0847951119a95ac`
    ); // API key included
    if (!res.ok)
      throw new Error("Network response was not ok " + res.statusText);
    const data = await res.json();
    displayMovieDetails(data);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// Display movie details in a modal or section
function displayMovieDetails(movie) {
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("movie-details");

  detailsContainer.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="${IMG_PATH}${movie.backdrop_path || "default-image.jpg"}" alt="${
    movie.title
  }" />
    <p>${movie.overview}</p>
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ${movie.vote_average}</p>
    <button id="close-details">Close</button>
  `;

  document.body.appendChild(detailsContainer);

  // Add close button functionality
  document.getElementById("close-details").addEventListener("click", () => {
    detailsContainer.remove();
  });
}

// Get CSS class based on movie rating
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
