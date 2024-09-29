import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.ts'

function LoginPage(){
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleRegister = async(e: React.FormEvent) =>{
        e.preventDefault();
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User Registered', userCredential.user);
        } catch(error: any){
            setError(error.message);
        };
    };

    return(
      <>
        <h1>Registrarse</h1>
        {error && <span className='text-red'>{error}</span>}
        <form onSubmit={handleRegister} className='text-black'>
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}            
            />
            <button className='text-white' type='submit'>Log In</button>
        </form>
      
      </>  
    )
}
export default LoginPage