import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { auth, db } from '../FirebaseConfig/firebaseConfig';
import { MessageIcon, PasswordIcon } from '../Icons/IconsManager';
import { setDoc, doc, getDoc } from 'firebase/firestore';

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
      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid),{
        email: user.email,
        role: 'admin'
      });

      console.log('User register', user)
      navigate('/'); // Redirect to the salon page
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
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if(userData?.role === 'admin'){
        navigate('/')
      }else{
        navigate('/')
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
//Toggle between the register or login mode
  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className=' flex justify-center flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff]/30 backdrop-blur-md rounded-2xl shadow-xl text-black'>
      <div className='flex flex-row justify-center gap-3 pb-4'>
        <div>
            {/* image */}
        </div>
         <h1 className='text-3xl font-bold text-[#fff] text-[#4B5563] my-auto'>Your Company</h1>
    </div>
      
      {/* <h1>{isRegister ? 'Register' : 'Log In'}</h1> */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='text-sm font-light text-[#fff] pb-8 '>Login to your account on Your Company.</div>
      <form className='text-black flex flex-col gap-6' onSubmit={isRegister ? handleRegister : handleLogin}>
          <div className='pb-2'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-[#fff] flex justify-start'>
              Email
            </label>
            <div className='relative text-gray-400'>
            <span className='absolute inset-y-0 left-0 flex items-center p-1 pl-3'><MessageIcon/></span>
            <input
              className='pl-10 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4'
              type='email'
              placeholder='e.g: name@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              </div>
            </div>
          <div className='pb-2'>
        <label className='block mb-2 text-sm font-medium text-[#fff] flex justify-start' htmlFor='password'>Password</label>
        <div className='relative text-gray-400'>
        <span className='absolute inset-y-0 left-0 flex items-center p-1 pl-3'><PasswordIcon/></span>
        <input
          className='pl-10 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        </div>
        <button className='text-white mb-4 rounded-lg hover:bg-white hover:text-black transition duration-1000 p-4 bg-black' type='submit'>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</button>
      </form>
        <button className='hover:text-[#fff] transition duration-600' onClick={toggleAuthMode}>
          {isRegister ? 'Already have an account? Sign In' : 'Do not have an account? Register'}
        </button>
    </div>
    </div>
  );
};

export default AuthPage;
