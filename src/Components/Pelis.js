import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth, db, collection, addDoc } from './firebase';

const API_KEY = '4c5c9c802cd6efdf2a8b841f311e72f8';

const TMDbComponent = ({ userEmail }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopularMovies, setShowPopularMovies] = useState(true);

  useEffect(() => {
    if (showPopularMovies) {
      fetchPopularMovies();
    }
  }, [showPopularMovies]);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      return;
    }

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      setMovies(response.data.results);
      setShowPopularMovies(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveMovie = async (movie) => {
    try {
      await addDoc(collection(db, 'savedMovies'), movie);
      console.log('Película guardada');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tmdb-container">
      <div className="header">
        <h2>Películas populares</h2>
        {showPopularMovies && (
          <Link to="/" className="back-button">Cerrar sesión</Link>
        )}
        {!showPopularMovies && (
          <button
            className="back-button"
            onClick={() => setShowPopularMovies(true)}
          >
            Regresar a populares
          </button>
        )}
        <Link to="/savedmovies" className="saved-movies-button">Ver películas guardadas</Link>
      </div>
      <p>Usuario: {userEmail}</p>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar películas..."
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TMDbComponent;
