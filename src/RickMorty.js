import React, { useState, useEffect } from 'react';

function Buscar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [characterData, setCharacterData] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Cargar el historial desde el almacenamiento local
    const savedHistory = localStorage.getItem('characterHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      return;
    }

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchQuery}`
      );
      const data = await response.json();
      setCharacterData(data.results);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }

    // Agregar el personaje al historial
    const updatedHistory = [...history, searchQuery];
    setHistory(updatedHistory);
    localStorage.setItem('characterHistory', JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('characterHistory');
  };

  return (
    <div>
      <h1>Personajes Rick y Morty</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Buscar por nombre...'
      />
      <button onClick={handleSearch}>Buscar</button>

      {characterData.length > 0 && (
        <div>
          <h1>Resultados:</h1>
          <ul>
            {characterData.map((character) => (
              <li key={character.id}>
                <h3>{character.name}</h3>
                <p>ID: {character.id}</p>
                <p>Estado: {character.status}</p>
                <p>Especie: {character.species}</p>
                <p>Género: {character.gender}</p>
                <img src={character.image} alt={character.name} />
                <p>≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂≂</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div id='historial'>
        <h2>Historial de búsquedas:</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button onClick={handleClearHistory}>Limpiar historial</button>
      </div>
    </div>
  );
}

export default Buscar;
