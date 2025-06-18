import { useState } from "react";
import { Link } from "react-router-dom";

const Recherche = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (movie) => {
    return movie.poster_path?.startsWith("data:image")
      ? movie.poster_path
      : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  };

  return (
    <div className="bg-black min-h-screen text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Rechercher des Films</h1>
          <p className="text-gray-400 text-lg">Découvrez votre prochain film préféré</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Tapez le nom d'un film..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-4 pl-12 pr-20 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black px-6 py-2 rounded-full font-semibold transition-colors"
              >
                {loading ? "..." : "Rechercher"}
              </button>
            </div>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
            <p className="mt-4 text-gray-400">Recherche en cours...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-24 w-24 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-400">Essayez avec d'autres mots-clés</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                Résultats pour "{query}" ({results.length})
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {results.map((movie) => (
                <Link
                  to={`/film/${movie.id}`}
                  key={movie.id}
                  className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
                >
                  <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={getImageUrl(movie)}
                      alt={movie.title}
                      loading="lazy"
                    />
                    
                    {/* Custom Film Badge */}
                    {movie.isCustom && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
                        Personnalisé
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2">
                          {movie.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-300">
                          <span>{movie.release_date?.split('-')[0] || movie.dateSortie}</span>
                          <span className="flex items-center">
                            ⭐ {movie.vote_average ? (movie.vote_average / 2).toFixed(1) : movie.rating || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Movie Title (visible on mobile) */}
                  <div className="md:hidden mt-2">
                    <h4 className="font-semibold text-sm line-clamp-2">{movie.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {movie.release_date?.split('-')[0] || movie.dateSortie}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Suggestions */}
        {!query && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-6">Suggestions de recherche</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {["Action", "Comédie", "Drame", "Horreur", "Science-fiction", "Romance"].map((genre) => (
                <button
                  key={genre}
                  onClick={() => setQuery(genre)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recherche;