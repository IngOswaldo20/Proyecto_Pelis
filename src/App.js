import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthComponent from "./Components/Login";
import TMDbComponent from "./Components/Pelis";
import SavedMovies from "./Components/SavedMovies";
import  "./Styles/App.css";
import "./Styles/login.css"
import "./Styles/SavedMovies.css"
import "./Styles/TMDbComponent.css"

const App = () => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AuthComponent setUserEmail={setUserEmail} />}
        />
        <Route
          path="/tmdb"
          element={<TMDbComponent userEmail={userEmail} />}
        />
        <Route path="/savedmovies" element={<SavedMovies />} />

      </Routes>
    </Router>
  );
};

export default App;
