import { useEffect } from 'react';
import { auth } from '/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.ts';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';


const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to the login page
    } catch (error) {
      console.error('Error log in:', error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/userRegister'); // Redirect to login if there is no authenticated user
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  return(
    <button className='font-bold' onClick={handleLogout}>Logout</button>
  ) 
};

export default Logout;
