import { useState } from "react";
import { Link } from "react-router-dom";

const Recherche = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    // Load custom films from localStorage
    const customFilms = JSON.parse(localStorage.getItem("customFilms") || "[]");
    const filteredCustom = customFilms.filter((film) =>
      film.title.toLowerCase().includes(query.toLowerCase())
    );

    // Fetch from TMDb
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=e0b651175cabada95c4c814e3969cbae&query=${query}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const apiResults = data.results || [];

    // Combine results (custom first)
    setResults([...filteredCustom, ...apiResults]);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Rechercher
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((movie) => (
          <Link
            to={`/film/${movie.id}`}
            key={movie.id}
            className="border rounded overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            <img
              className="w-full h-[300px] object-cover"
              src={
                movie.poster_path?.startsWith("data:image")
                  ? movie.poster_path
                  : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              }
              alt={movie.title}
            />
            <div className="p-2">
              <h4 className="font-semibold text-center">{movie.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recherche;
