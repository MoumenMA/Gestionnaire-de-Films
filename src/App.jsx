import { BrowserRouter, Route, Routes } from "react-router-dom";

import Acceuil from "./page/Acceuil";
import Ajouter from "./components/Ajouter";
import NavBar from "./components/NavBar";
import Recherche from "./page/Recherche";
import { MovieDetails } from "./components/MovieDetails";
import { Nopage } from "./page/Nopage";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/film/:id" element={<MovieDetails />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/ajouter" element={<Ajouter />} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
