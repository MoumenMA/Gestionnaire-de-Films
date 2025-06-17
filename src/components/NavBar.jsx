import { Link } from "react-router-dom";

const NavBar = () => {
  const navItems = [
    { path: "/", label: "Acceuil" },
    { path: "/recherche", label: "Recherche" },
    { path: "/ajouter", label: "Ajouter Films" },
  ];
  return (
    <nav className="border-2 border-blue-600   mx-64 my-9">
      <div>
        {navItems.map(({ path, label }) => (
          <Link
            className=" px-4 py-2 rounded-xl space-x-2 font-medium transition-all duration-300 hover:scale-105"
            key={path}
            to={path}
          >
            {" "}
            <span>{label}</span>
          </Link>
        ))}
      </div>
    
    </nav>
  );
};
export default NavBar;
