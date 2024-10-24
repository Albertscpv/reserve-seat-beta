import { useEffect } from 'react';
import { auth } from '../FirebaseConfig/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth'; 
import { LogoutIcon } from '../Icons/IconsManager';


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
    <button className='font-bold flex' onClick={handleLogout}> 
        <LogoutIcon/>
    </button>
  ) 
};

export default Logout;
