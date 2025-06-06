import {BrowserRouter, Route,Routes } from "react-router-dom";

import Acceuil from "./components/Acceuil";
import Ajouter from "./components/Ajouter";
import NavBar from "./components/NavBar";
import Recherche from "./components/Recherche";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/ajouter" element={<Ajouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
