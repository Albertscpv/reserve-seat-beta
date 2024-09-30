import { useEffect } from 'react';
import { auth } from '/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.ts';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';


const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/userRegister'); // Redirigir al inicio de sesión si no hay usuario autenticado
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  return(
    <button onClick={handleLogout}>Cerrar Sesión</button>
  ) 
};

export default Logout;
