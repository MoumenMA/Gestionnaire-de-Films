import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Acceuil = () => {
  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=e0b651175cabada95c4c814e3969cbae";

  const [movieList, setMovieList] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const getMovie = async () => {
    const res = await fetch(url);
    const data = await res.json();

    const apiMovies = data.results || [];
    const customMovies = JSON.parse(
      localStorage.getItem("customFilms") || "[]"
    );

    const allMovies = [...customMovies, ...apiMovies];
    setMovieList(allMovies);
    
    // Set first movie as featured
    if (allMovies.length > 0) {
      setFeaturedMovie(allMovies[0]);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const getImageUrl = (movie) => {
    return movie.poster_path?.startsWith("data:image")
      ? movie.poster_path
      : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  };

  const getBackdropUrl = (movie) => {
    if (movie.poster_path?.startsWith("data:image")) {
      return movie.poster_path;
    }
    return movie.backdrop_path 
      ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative h-screen">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getBackdropUrl(featuredMovie)})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          </div>
          
          <div className="relative z-10 flex items-center h-full px-6 max-w-7xl mx-auto">
            <div className="max-w-2xl pt-20">
              <h1 className="text-6xl font-bold mb-4 leading-tight">
                {featuredMovie.title}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-yellow-400 text-black px-2 py-1 rounded font-semibold">
                  ⭐ {featuredMovie.vote_average ? (featuredMovie.vote_average / 2).toFixed(1) : featuredMovie.rating}/5
                </span>
                <span className="text-gray-300">
                  {featuredMovie.release_date?.split('-')[0] || featuredMovie.dateSortie}
                </span>
                <span className="px-3 py-1 border border-gray-500 rounded text-sm">
                  {featuredMovie.isCustom ? featuredMovie.type : 'Film'}
                </span>
              </div>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                {featuredMovie.overview || featuredMovie.description || "Une expérience cinématographique inoubliable vous attend."}
              </p>
              <div className="flex space-x-4">
                <Link 
                  to={`/film/${featuredMovie.id}`}
                  className="bg-white text-black px-8 py-3 rounded font-semibold text-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Regarder</span>
                </Link>
                <button className="bg-gray-600/70 text-white px-8 py-3 rounded font-semibold text-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Plus d'infos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movies Grid */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Films Populaires</h2>
          <p className="text-gray-400">Découvrez notre sélection de films</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movieList.map((movie) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2">
                      {movie.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span>{movie.release_date?.split('-')[0] || movie.dateSortie}</span>
                      <span className="flex items-center">
                        ⭐ {movie.vote_average ? (movie.vote_average / 2).toFixed(1) : movie.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Acceuil;