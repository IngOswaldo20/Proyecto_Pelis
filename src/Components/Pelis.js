import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = '4c5c9c802cd6efdf2a8b841f311e72f8';

const TMDbComponent = ({ userEmail }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [popularMovies, setPopularMovies] = useState([]);
  const [showPopularButton, setShowPopularButton] = useState(false);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setMovies(response.data.results);
      setPopularMovies(response.data.results);
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
      setShowPopularButton(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPopularMovies = () => {
    setMovies(popularMovies);
    setShowPopularButton(false);
  };

  return (
    <div className="tmdb-container">
      <div className="header">
        <h2 className='popular-title'>Películas populares</h2>
        <Link to="/" className="back-button">
          Regresar al inicio de sesión
        </Link>
      </div>
      <p className='user-email'>Usuario: {userEmail}</p>
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
        {showPopularButton && (
          <button onClick={handleShowPopularMovies} className="popular-button">
            Mostrar populares
          </button>
        )}
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
              <p>Fecha de estreno: {movie.release_date}</p>
              <p>Calificación: {movie.vote_average}</p>
              <p>Popularidad: {movie.popularity}</p>
              <p>{movie.overview}</p>
              <button
                className="movie-button"
                onClick={() => console.log(movie.id)}
              >
                Ver ID
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TMDbComponent;
