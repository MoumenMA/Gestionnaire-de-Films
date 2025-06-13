import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Acceuil = () => {
  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=e0b651175cabada95c4c814e3969cbae";

  const [movieList, setMovieList] = useState([]);

  const getMovie = async () => {
    const res = await fetch(url);
    const data = await res.json();

    const apiMovies = data.results || [];
    const customMovies = JSON.parse(localStorage.getItem("customFilms") || "[]");

    setMovieList([...customMovies, ...apiMovies]);
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);

  return (
    <div>
      <h1> liste de films populaires</h1>
      <div className="grid grid-cols-4 gap-4 ">
        {movieList.map((movie) => {
          return (
            <Link to={`/film/${movie.id}`} key={movie.id} className="border  ">
              <h4 className="border border-red-700">{movie.title}</h4>
              <img
                className="w-[200px]"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Acceuil;
