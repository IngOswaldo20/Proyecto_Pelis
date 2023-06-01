import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthComponent from "./Components/Login";
import TMDbComponent from "./Components/Pelis";
import app from "./Styles/App.css";

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
      </Routes>
    </Router>
  );
};

export default App;
