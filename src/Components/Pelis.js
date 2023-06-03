import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth, db, collection, addDoc } from './firebase';
import '../Styles/TMDbComponent.css';

const API_KEY = '4c5c9c802cd6efdf2a8b841f311e72f8';

const TMDbComponent = ({ userEmail }) => {
  const [movies, setMovies] = useState([]); // Almacena la lista de películas obtenidas de la API
  const [searchQuery, setSearchQuery] = useState(''); // Almacena la consulta de búsqueda del usuario
  const [showPopularMovies, setShowPopularMovies] = useState(true); // Determina si se muestran las películas populares o los resultados de búsqueda

  useEffect(() => {
    if (showPopularMovies) {
      fetchPopularMovies(); // Carga las películas populares al  componente
    }
  }, [showPopularMovies]);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setMovies(response.data.results); // Actualiza la lista de películas populares 
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      return;
    }

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;

      const response = await axios.get(url);
      setMovies(response.data.results); // Actualiza la lista de películas con los resultados de búsqueda
      setShowPopularMovies(false); // Cambia al modo de resultados de búsqueda
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveMovie = async (movie) => {
    try {
      await addDoc(collection(db, 'Vermastarde'), movie); // Guarda la película en la colección 'savedMovies' en la base de datos
      console.log('Película guardada');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecommendMovie = async (movie) => {
    const recommendation = prompt('Escribe tu recomendación:'); // Muestra un cuadro de diálogo para que el usuario ingrese su recomendación
    if (recommendation !== null) {
      try {
        const data = {
          userEmail,
          movieName: movie.title,
          recommendationText: recommendation,
        };

        await addDoc(collection(db, 'recomendaciones'), data); // Guarda la recomendación en la colección 'recommendations' en la base de datos
        console.log('Recomendación guardada');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="tmdb-container">
      <div className="header">
        <h2>Películas populares</h2>
        {showPopularMovies && (
          <Link to="/" className="back-button">
            Cerrar sesión
          </Link>
        )}
        {!showPopularMovies && (
          <button
            className="back-button"
            onClick={() => setShowPopularMovies(true)}
          >
            Regresar a populares
          </button>
        )}
        <Link to="/savedmovies" className="saved-movies-button">
          Ver más tarde
        </Link>
        <Link to="/recommendations" className="recommendations-button">
          Ver recomendaciones
        </Link>
      </div>
      <p>Usuario: {userEmail}</p>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar películas por nombre..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
              <button
                className="movie-button"
                onClick={() => handleSaveMovie(movie)}
              >
                Guardar para ver más tarde
              </button>
              <button
                className="recommend-button"
                onClick={() => handleRecommendMovie(movie)}
              >
                Recomendar película
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TMDbComponent;
