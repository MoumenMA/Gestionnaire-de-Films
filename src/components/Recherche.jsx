import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const Recherche = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerms = searchParams.get("q");
  const [inputValue, setInputValue] = useState(searchTerms || ""); // keep input in sync
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerms || searchTerms.trim() === "") {
        setSearchResults([]);
        return;
      }

      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=e0b651175cabada95c4c814e3969cbae&query=${encodeURIComponent(
        searchTerms
      )}`;

      try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        console.log("Search results:", data);
        setSearchResults(data.results || []);
      } catch (error) {
        console.log("error", error);
        setSearchResults([]);
      }
    };
    fetchSearchResults();
  }, [searchTerms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      navigate(`/recherche?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <>
      <div>Rechercher votre film préféré</div>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-2 border-gray-300 p-2 w-full"
            placeholder="Search movies..."
            required
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Search
          </button>
        </div>
      </form>

      <div>
        {searchTerms && (
          <p>
            Search Results for: "{searchTerms}" ({searchResults.length} results)
          </p>
        )}
        {searchResults.length === 0 && searchTerms && (
          <p>No movies found for "{searchTerms}"</p>
        )}
        {searchResults.map((movie) => (
          <Link
            to={`/film/${movie.id}`}
            key={movie.id}
            className="border block mb-4 p-4"
          >
            <h4 className="border border-red-700 p-2">{movie.title}</h4>
            <div className="flex gap-4">
              {movie.poster_path && (
                <img
                  className="w-[200px]"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <div>
                <p className="text-sm text-gray-600">{movie.release_date}</p>
                <p className="text-sm">
                  {movie.overview?.substring(0, 200)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Recherche;
