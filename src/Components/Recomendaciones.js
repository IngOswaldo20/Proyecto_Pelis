import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';

const RecommendationsComponent = () => {
  const [recommendations, setRecommendations] = useState([]); // Almacena las recomendaciones
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

  useEffect(() => {
    fetchRecommendations(); // Carga las recomendaciones al  componente
  }, []);

  const fetchRecommendations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recomendaciones')); // Obtiene los documentos de la colección 
      const data = querySnapshot.docs.map((doc) => doc.data()); // Mapea los datos de los documentos a un array de recomendaciones
      setRecommendations(data); // Actualiza las recomendaciones en el estado
      setLoading(false); // Actualiza el estado de carga a false, indicando que los datos han sido cargados
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recommendations-container">
      <h2>Películas recomendadas</h2>
      <Link to="/tmdb" className="back-button9">
        Volver a TMDB
      </Link>
      {loading ? (
        <p>Cargando...</p> // Muestra un mensaje de carga si los datos aún se están cargando
      ) : (
        <ul className="recommendations-list">
          {recommendations.map((recommendation) => (
            <li key={recommendation.id} className="recommendation-item">
              <h3>Película: {recommendation.movieName}</h3>
              <p>Usuario: {recommendation.userEmail}</p>
              <p>Opinión: {recommendation.recommendationText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationsComponent;
