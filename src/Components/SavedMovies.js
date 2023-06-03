import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import '../Styles/SavedMovies.css';

const SavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    fetchSavedMovies();
  }, []);

  const fetchSavedMovies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'savedMovies'));
      const movies = querySnapshot.docs.map((doc) => doc.data());
      setSavedMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMovies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'savedMovies'));
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      setSavedMovies([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="saved-movies-container">
      <h2>Películas Guardadas</h2>
      <div className="button-container">
        <button className="delete-button" onClick={handleDeleteMovies}>
          Borrar todas las películas
        </button>
        <Link to="/tmdb" className="return-button">Volver a películas populares</Link>
      </div>
      <div className="movies-list">
        {savedMovies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h3>{movie.title}</h3>
            <p>{movie.releaseDate}</p>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedMovies;
