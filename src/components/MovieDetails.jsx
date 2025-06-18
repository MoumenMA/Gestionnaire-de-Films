import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const customFilms = JSON.parse(localStorage.getItem("customFilms") || "[]");
        const customMovie = customFilms.find((film) => film.id.toString() === id);
        
        if (customMovie) {
          setMovie(customMovie);
        } else {
          const MovieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=e0b651175cabada95c4c814e3969cbae`;
          const res = await fetch(MovieDetailsUrl);
          const data = await res.json();
          setMovie(data);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Film non trouvé</div>
      </div>
    );
  }

  const isCustom = movie.isCustom;
  const backdropUrl = isCustom 
    ? movie.poster_path 
    : `https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`;
  const posterUrl = isCustom 
    ? movie.poster_path 
    : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative z-10 flex items-end h-full px-6 pb-20 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end space-y-8 lg:space-y-0 lg:space-x-12 w-full">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                className="w-80 lg:w-96 rounded-lg shadow-2xl"
                src={posterUrl}
                alt={movie.title}
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold text-lg">
                  ⭐ {isCustom ? movie.rating : (movie.vote_average / 2).toFixed(1)}/5
                </span>
                <span className="text-gray-300 text-lg">
                  {isCustom ? movie.dateSortie : movie.release_date?.split('-')[0]}
                </span>
                {!isCustom && movie.runtime && (
                  <span className="text-gray-300 text-lg">{movie.runtime} min</span>
                )}
                <span className="px-4 py-2 border border-gray-500 rounded-full text-sm">
                  {isCustom ? movie.type : movie.genres?.map(g => g.name).join(', ') || 'Film'}
                </span>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {isCustom ? movie.description : movie.overview}
              </p>

              {!isCustom && movie.vote_count && (
                <p className="text-gray-400 mb-8">
                  Basé sur {movie.vote_count.toLocaleString()} votes
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Regarder maintenant</span>
                </button>
                
                <button className="bg-gray-600/70 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-colors flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Ma liste</span>
                </button>

                <button className="bg-gray-600/70 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-colors flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L8 20m7-10V9a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 13v-1M8 20l-2-1m2 1v-3.5a3.5 3.5 0 00-3.5-3.5H3" />
                  </svg>
                  <span>J'aime</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      {!isCustom && (
        <div className="px-6 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                {movie.overview}
              </p>
              
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Production</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.production_companies.map((company) => (
                      <span key={company.id} className="bg-gray-800 px-4 py-2 rounded-full text-sm">
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Détails</h3>
              <div className="space-y-3 text-gray-300">
                <div>
                  <span className="font-medium">Date de sortie:</span>
                  <span className="ml-2">{movie.release_date}</span>
                </div>
                {movie.runtime && (
                  <div>
                    <span className="font-medium">Durée:</span>
                    <span className="ml-2">{movie.runtime} minutes</span>
                  </div>
                )}
                {movie.budget > 0 && (
                  <div>
                    <span className="font-medium">Budget:</span>
                    <span className="ml-2">${movie.budget.toLocaleString()}</span>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <span className="font-medium">Recettes:</span>
                    <span className="ml-2">${movie.revenue.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};