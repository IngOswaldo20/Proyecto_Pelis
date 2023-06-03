import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import '../Styles/SavedMovies.css';

const SavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]); // Almacena las películas guardadas

  useEffect(() => {
    fetchSavedMovies(); // Carga las películas guardadas al componente
  }, []);

  const fetchSavedMovies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Vermastarde')); // Obtiene los documentos de la colección 
      const movies = querySnapshot.docs.map((doc) => doc.data()); // Mapea los datos de los documentos a un array de películas
      setSavedMovies(movies); // Actualiza las películas guardadas en el estado
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMovies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Vermastarde')); // Obtiene los documentos de la colección  
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref); // Elimina cada documento de la colección
      });
      setSavedMovies([]); // Actualiza la lista de películas guardadas vacía
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
        <Link to="/tmdb" className="return-button">
          Volver a películas populares
        </Link>
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
