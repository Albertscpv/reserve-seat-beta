import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.ts'; 

interface Salon {
  id: string;
  name: string;
  description?: string;
  features: string[];
  available: boolean;
}

const SalonPage = () => {
      const [salons, setSalons] = useState<Salon[]>([]);
      const [newSalon, setNewSalon] = useState({ name: '', description: '', features: '', available: false });

      const fetchSalons = async () => {
      const querySnapshot = await getDocs(collection(db, 'salones'));

      const salonsArray: Salon[] = [];
        querySnapshot.forEach((doc) => {
        salonsArray.push({ id: doc.id, ...doc.data() } as Salon);
      });
        setSalons(salonsArray);
      };

      const handleAddSalon = async (e: React.FormEvent) => {
          e.preventDefault();
          const { name, description, features, available } = newSalon;
          if (name.trim()) {
            await addDoc(collection(db, 'salones'), {
              name,
              description,
              features: features.split(',').map(f => f.trim()), // Convert features to array
              available,
            });
          setNewSalon({ name: '', description: '', features: '', available: false });
          fetchSalons(); // Reload salones
        }
      };

      const handleUpdateSalon = async (id: string, updatedSalon: Partial<Salon>) => {
      const salonRef = doc(db, 'salones', id);
        await updateDoc(salonRef, updatedSalon);
            fetchSalons(); // Reload salones
      };

      const handleDeleteSalon = async (id: string) => {
          await deleteDoc(doc(db, 'salones', id));
      fetchSalons();
      };

    
      useEffect(() => {
        fetchSalons();
      }, []);
    return (
      <>
        <h2 className='font-bold text-3xl'>Gestión de Salones</h2>
    <div className= 'flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff]/30 backdrop-blur-md  rounded-2xl shadow-xl text-black mt-4'>

      <form onSubmit={handleAddSalon} className='text-black flex gap-4 justify-center p-4 flex-col'>
        <input
          className='pl-10 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4'
          type='text'
          value={newSalon.name}
          onChange={(e) => setNewSalon({ ...newSalon, name: e.target.value })}
          placeholder='Nombre del salón'
        />
        <input
          className='pl-10 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4'
          type='text'
          value={newSalon.description}
          onChange={(e) => setNewSalon({ ...newSalon, description: e.target.value })}
          placeholder='Descripción'
        />
        <input
          className='pl-10 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4'
          type='text'
          value={newSalon.features}
          onChange={(e) => setNewSalon({ ...newSalon, features: e.target.value })}
          placeholder='Características (separadas por comas)'
        />
        <label className='text-white flex gap-2'>
          Disponible:
          <input
            type='checkbox'
            checked={newSalon.available}
            onChange={(e) => setNewSalon({ ...newSalon, available: e.target.checked })}
          />
        </label>
        <button className='text-white bg-black p-2 rounded-full hover:bg-white hover:text-black transition duration-500' type='submit'>Agregar Salón</button>
      </form>
    </div>
    
    <div className='flex p-2'>
      <ul className='flex flex-wrap place-content-center gap-4 text-start my-6'>
        {salons.map((salon) => (
          <li className='bg-white/30 backdrop-blur-md p-4 rounded-md' key={salon.id}>
            <h3 className='font-bold text-2xl'>{salon.name}</h3>
            <p>Descripción: {salon.description || 'Sin descripción'}</p>
            <p>Características: {salon.features.join(', ')}</p>
            <p>{salon.available ? 'Disponible' : 'No disponible'}</p>
            <div className='flex gap-4'>
            <button className='p-4 bg-black text-white rounded-md my-4 hover:bg-white hover:text-black transition duration-500 ' onClick={() => handleUpdateSalon(salon.id, { available: !salon.available })}>
              Cambiar disponibilidad
            </button>
            <button className='p-4 bg-[#D40101] text-white rounded-md my-4 hover:bg-[#D40101]/30 transition duration-600' onClick={() => handleDeleteSalon(salon.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default SalonPage;
