import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import { MovieCard } from "./components/MovieCard";
import Spinner from "./components/Spinner";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

//API - Application programming interface - a set of rules that allows one software application to talk to another

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "get",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]); // State to hold trending moviess

  //Debounce the search term to prevent making too many API calls

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    800,
    [searchTerm]
  );

  const fetchMovies = async (query = "") => {
    setisLoading(true);
    seterrorMessage("");
    try {
      const enndpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(enndpoint, API_OPTIONS);
      const data = await response.json();

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      seterrorMessage(error.message);
    } finally {
      setisLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const trending = await getTrendingMovies();
      setTrendingMovies(trending);
    } catch (error) {
      console.error("Error fetching trending movies:", error.message);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            <span
              className="
              text-gradient"
            >
              Movies
            </span>
            you&apos;ll enjoy without Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="wrapper">
          <h2>Trendins Movies</h2>
          {trendingMovies.length > 0 && (
            <section className="trending  ">
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.movie_id}>
                    <p>{index + 1}</p>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_url}`}
                      alt={movie.title}
                    />
                    <p>{movie.title}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <section className="all-movies wrapper">
          <h2>All movies</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
