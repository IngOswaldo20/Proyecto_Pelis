import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const firebaseConfig = {
  apiKey: "AIzaSyCK5A3Fq6NNOwBvC8Qz5wpOwbyC8eYuCuQ",
  authDomain: "proyecto2p-8180e.firebaseapp.com",
  projectId: "proyecto2p-8180e",
  storageBucket: "proyecto2p-8180e.appspot.com",
  messagingSenderId: "912637279348",
  appId: "1:912637279348:web:4e4f7990ac7a53059fe521"
};


// Inicializa la aplicación de Firebase
initializeApp(firebaseConfig);

function AuthComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Obtiene la función de navegación

  const auth = getAuth(); // Obtiene la instancia de autenticación

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registro exitoso:', user);
        navigate('/dashboard'); // Redirige al usuario a la ruta "/dashboard" después de registrarse
      })
      .catch((error) => {
        console.error('Error al registrarse:', error);
      });
  };

  const handleEmailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Inicio de sesión exitoso:', user);
        navigate('/dashboard'); // Redirige al usuario a la ruta "/dashboard" después de iniciar sesión
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
      });
  };

  return (
    <div className="auth-container">
      <h2>Registro e inicio de sesión</h2>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>

      <button className="btn" onClick={handleEmailSignUp}>Registrarse con correo</button>
      <button className="btn" onClick={handleEmailSignIn}>Iniciar sesión con correo</button>
    </div>
  );
}

export default AuthComponent;
