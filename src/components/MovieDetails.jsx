import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const MovieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=e0b651175cabada95c4c814e3969cbae`;

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

  return (
    <>
      <div>
        {" "}
        <img
          className="w-[300px] rounded mb-4"
          src={
            movie.isCustom
              ? movie.poster_path
              : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          }
          alt={movie.title}
        />
        <h5>Title: {movie?.title}</h5>
        <h5>Overview:{movie?.overview}</h5>
        <h5>ReleaseDate:{movie?.release_date}</h5>
        <h5>Type:{movie?.genres.map((genre) => genre.name).join(", ")}</h5>
        <h4>
          Rating: {movie?.vote_average / 2} / 5 {movie?.votre_count}
        </h4>
      </div>
    </>
  );
};
