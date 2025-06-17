import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const customFilms = JSON.parse(localStorage.getItem("customFilms") || "[]");
    const customMovie = customFilms.find((film) => film.id.toString() === id);
    if (customMovie) {
      setMovie(customMovie);
    } else {
      const MovieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=e0b651175cabada95c4c814e3969cbae`;
      fetch(MovieDetailsUrl)
        .then((res) => res.json())
        .then((json) => setMovie(json))
        .catch((error) => {
          console.error("Error fetching TMDb movie:", error);
          setMovie(null);
        });
    }
  }, [id]);

  if (!movie) return <div>Chargement...</div>;

  const isCustom = movie.isCustom;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        className="w-[300px] rounded mb-4"
        src={
          isCustom
            ? movie.poster_path
            : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        }
        alt={movie.title}
      />

      <h2 className="text-xl font-bold mb-2">Titre: {movie.title}</h2>

      {isCustom ? (
        <>
          <p className="mb-2">Description: {movie.description}</p>
          <p className="mb-2">Date de sortie: {movie.dateSortie}</p>
          <p className="mb-2">Type: {movie.type}</p>
          <p className="mb-2">Note: {movie.rating} / 5</p>
        </>
      ) : (
        <>
          <p className="mb-2">Overview: {movie.overview}</p>
          <p className="mb-2">Release Date: {movie.release_date}</p>
          <p className="mb-2">
            Genres: {movie.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p className="mb-2">
            Rating: {movie.vote_average / 2} / 5 ({movie.vote_count} votes)
          </p>
        </>
      )}
    </div>
  );
};
