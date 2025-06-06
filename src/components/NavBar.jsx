import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="border-2 border-blue-600 flex items-center justify-between  mx-64 my-9">
      <Link to="/" className="border-2 border-red-600">
        {" "}
        Acceuil
      </Link>
      <Link to="/recherche" className="border-2 border-red-600">
        {" "}
        Recherche
      </Link>
      <Link to="/ajouter" className="border-2 border-red-600">
        {" "}
        Ajouter Films
      </Link>
    </nav>
  );
};
export default NavBar;
