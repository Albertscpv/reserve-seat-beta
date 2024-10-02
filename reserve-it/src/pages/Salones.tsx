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
        <h1 className='font-bold text-3xl'>Gestión de Salones</h1>
    <div className= 'flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff]/30 backdrop-blur-md  rounded-2xl shadow-xl text-black mt-4'>
      {/* Add new Salon */}
      <form onSubmit={handleAddSalon} className='text-black flex gap-4 justify-center p-4 flex-col'>
        <input
          type='text'
          value={newSalon.name}
          onChange={(e) => setNewSalon({ ...newSalon, name: e.target.value })}
          placeholder='Nombre del salón'
        />
        <input
          type='text'
          value={newSalon.description}
          onChange={(e) => setNewSalon({ ...newSalon, description: e.target.value })}
          placeholder='Descripción'
        />
        <input
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
        <button className='text-black bg-sky-200 p-2 rounded-full ' type='submit'>Agregar Salón</button>
      </form>
    </div>
    <div className='flex flex-row flex-1 p-4 mt-4 gap-4'>
      <ul className='flex flex-wrap gap-4 text-start'>
        {salons.map((salon) => (
          <li key={salon.id}>
            <h3 className='font-bold text-2xl'>{salon.name}</h3>
            <p>Descripción: {salon.description || 'Sin descripción'}</p>
            <p>Características: {salon.features.join(', ')}</p>
            <p>{salon.available ? 'Disponible' : 'No disponible'}</p>
            <div className='flex gap-4'>
            <button className='p-4 bg-sky-200 text-black rounded-xl my-4 ' onClick={() => handleUpdateSalon(salon.id, { available: !salon.available })}>
              Cambiar disponibilidad
            </button>
            <button className='p-4 bg-sky-200 text-black rounded-xl my-4 ' onClick={() => handleDeleteSalon(salon.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default SalonPage;
