import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { auth } from '/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.ts';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate(); // Inicializamos useNavigate


// Register user into the page
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
      navigate('/salones'); // Redirigir a la página de salones
    } catch (error: any) {
      setError(error.message);
    }
  };
// Log In an user into the page
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario inició sesión:', userCredential.user);
      navigate('/salones'); // Redirigir a la página de salones
    } catch (error: any) {
      setError(error.message);
    }
  };
//Toggle between the register or login mode
  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div>
      <h1>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form className='text-black' onSubmit={isRegister ? handleRegister : handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='text-white' type="submit">{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</button>
      </form>

      <button  onClick={toggleAuthMode}>
        {isRegister ? '¿Ya tienes cuenta? Iniciar Sesión' : '¿No tienes cuenta? Registrarse'}
      </button>
      
    </div>
  );
};

export default AuthPage;
