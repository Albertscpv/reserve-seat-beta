import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { auth } from '/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.ts';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate(); // Start the useNavigate


// Register user into the page
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
      navigate('/salones'); // Redirect to the salon page
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
      console.log('Log In succesfull:', userCredential.user);
      navigate('/salones'); // Redirect to the salon page
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
      <h1>{isRegister ? 'Register' : 'Log In'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form className='text-black' onSubmit={isRegister ? handleRegister : handleLogin}>
        <input
          type='email'
          placeholder='Correo electrónico'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='text-white' type='submit'>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</button>
      </form>

      <button  onClick={toggleAuthMode}>
        {isRegister ? 'Already have an account? Sign In' : 'Do not have an account? Register'}
      </button>
      
    </div>
  );
};

export default AuthPage;
