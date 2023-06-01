import React, { useState } from 'react';
import login from '../Styles/login.css'
import TMDbComponent from '../Styles/TMDbComponent.css';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCK5A3Fq6NNOwBvC8Qz5wpOwbyC8eYuCuQ",
  authDomain: "proyecto2p-8180e.firebaseapp.com",
  projectId: "proyecto2p-8180e",
  storageBucket: "proyecto2p-8180e.appspot.com",
  messagingSenderId: "912637279348",
  appId: "1:912637279348:web:4e4f7990ac7a53059fe521"
};
const AuthComponent = ({ setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Inicializar la aplicación de Firebase
  initializeApp(firebaseConfig);
  const auth = getAuth();

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserEmail(userCredential.user.email);
      navigate('/tmdb');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      setUserEmail(userCredential.user.email);
      navigate('/tmdb');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserEmail(userCredential.user.email);
      navigate('/tmdb');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Autenticación</h2>
      <div className="auth-error">{errorMessage}</div>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleRegistration} className="auth-button">
        Registrarse
      </button>
      <button onClick={handleEmailLogin} className="auth-button">
        Iniciar sesión con correo
      </button>
      <button onClick={handleGoogleLogin} className="auth-button">
        Iniciar sesión con Google
      </button>
      
      <Link to="/tmdb">Acceder sin autenticación</Link>
    </div>
  );
};

export default AuthComponent;
