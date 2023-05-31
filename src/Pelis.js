import React, { useEffect, useState } from 'react';
import './TMDbComponent.css';

const TMDbComponent = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleClick = (id) => {
    alert(`ID de la película: ${id}`);
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=4c5c9c802cd6efdf2a8b841f311e72f8')
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.log(error));
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=4c5c9c802cd6efdf2a8b841f311e72f8&query=${searchQuery}`)
        .then(response => response.json())
        .then(data => setSearchResults(data.results))
        .catch(error => console.log(error));
    } else {
      setSearchResults([]);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (typeof movies === 'undefined' || !Array.isArray(movies)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tmdb-component">
      <h1>Películas populares</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <ul className="movie-list">
        {searchResults.length > 0 ? (
          searchResults.map(movie => (
            <li key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>Fecha de lanzamiento: {movie.release_date}</p>
                <button onClick={() => handleClick(movie.id)}>Mostrar ID</button>
              </div>
            </li>
          ))
        ) : (
          movies.map(movie => (
            <li key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>Fecha de lanzamiento: {movie.release_date}</p>
                <button onClick={() => handleClick(movie.id)}>Mostrar ID</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TMDbComponent;
