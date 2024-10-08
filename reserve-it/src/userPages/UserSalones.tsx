import React, { useState, useEffect,  } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.ts'; 
import { useNavigate } from 'react-router-dom';

interface Salon {
  id: string;
  name: string;
  description?: string;
  features: string[];
  available: boolean;
}

const SalonPage = () => {
      const [salons, setSalons] = useState<Salon[]>([]);
      const navigate = useNavigate(); // Start the useNavigate

      //Salones array
      const fetchSalons = async () => {
      const querySnapshot = await getDocs(collection(db, 'salones'));

      const salonsArray: Salon[] = [];
        querySnapshot.forEach((doc) => {
        salonsArray.push({ id: doc.id, ...doc.data() } as Salon);
      });
        setSalons(salonsArray);
      };

      const handleReserveSalon = async () => {
        navigate('/')
      }

      useEffect(() => {
        fetchSalons();
      }, []);
    return (
      <>
        <h2 className='font-bold text-3xl'>Salones disponibles</h2>    
    <div className='flex p-2 justify-center'>
      <ul className='flex flex-wrap place-content-center gap-4 text-start my-6'>
        {salons.map((salon) => (
          <li className='bg-white/30 backdrop-blur-md p-4 rounded-md' key={salon.id}>
            <h3 className='font-bold text-2xl'>{salon.name}</h3>
            <p>Descripción: {salon.description || 'Sin descripción'}</p>
            <p>Características: {salon.features.join(', ')}</p>
            <p>{salon.available ? 'Disponible' : 'No disponible'}</p>
            <div className='flex gap-4'>
            <button className='p-4 bg-black text-white rounded-md my-4 hover:bg-white hover:text-black transition duration-500 ' onClick={() => handleReserveSalon()}>
              Reservar
            </button>
            <button className='p-4 bg-[#D40101] text-white rounded-md my-4 hover:bg-[#D40101]/30 transition duration-600'>
              Ver Salon
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default SalonPage;
