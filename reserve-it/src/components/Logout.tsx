import { signOut } from 'firebase/auth';
import { auth } from '/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.ts';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  return(
    <button onClick={handleLogout}>Cerrar Sesión</button>
  ) 
};

export default Logout;
