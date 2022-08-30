import { useState, useEffect } from "react";
import "./App.css";
import { ReactComponent as SearchIcon } from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=1669fd25";
const App = () => {
  // use Hook useState
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // get data film via API omDB
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json(); // ubah data ke dalam json

    setMovies(data.Search); // get property from API data.Search and set movies
  };

  // default value film search iron man
  useEffect(() => {
    searchMovies("Iron Man");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Cari film ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {/* looping data film in card */}
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Tidak ada film yang di temukan</h2>
        </div>
      )}
    </div>
  );
};

export default App;
