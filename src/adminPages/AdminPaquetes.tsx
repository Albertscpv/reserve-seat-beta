import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '/workspaces/reserve-seat-beta/firebaseConfig.ts'; // Asegúrate de usar el archivo firebaseConfig.ts

interface Package{
    id: string;
    name:string;
    price: number;
    description:string;
    features:string[];
    available:boolean;
}


const Paquetes = () => {

    const [packages, setPackages] = useState<Package[]>([]);
    const [newPackage, setNewPackage] = useState({name: '', price: '', description : '', features: '', available: false });

    const fetchPackages = async () =>{
        const querySnapshot = await getDocs(collection(db, 'paquetes'))
        const packageArray: Package[] = [];
        querySnapshot.forEach((doc)=>{
            packageArray.push( { id: doc.id, ...doc.data() } as Package)
        });
        setPackages(packageArray);
    }

        const handleAddPackage = async(e: React.FormEvent) => {
            e.preventDefault();
            const { name, price, description, features, available  } = newPackage;
            if(name.trim()){
                await addDoc(collection(db, 'paquetes'), {
                name,
                price,
                description,
                features: features.split(',').map(f => f.trim()),
                available,
                });
            };
            setNewPackage({name: '', price: '', description : '', features: '', available: false });
            fetchPackages();
        }
        
        const handleUpdatePackage = async (id:string, updatedPackage: Partial<Package>) => {
            const salonRef = doc(db, 'paquetes', id);
            await updateDoc(salonRef, updatedPackage);
            fetchPackages();
        }

        const handleDeleteSalon = async (id:string) => {
            await deleteDoc(doc(db, 'paquetes', id));
            fetchPackages()
        };

        useEffect(() => {
            fetchPackages();
        }, [])

    return(
        <>  
            <h2 className='text-2xl font-bold'>Gestion de Paquetes</h2>
        <div className= 'flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff]/30 backdrop-blur-md  rounded-2xl shadow-xl text-black mt-4'>
            <form onSubmit={handleAddPackage} className='text-black flex gap-4 flex-col justify-center'>
                <input
                    className='pl-10 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4'
                    type='text'
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                    placeholder='Package Name'
                />
                <input
                    className='pl-10 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4'
                    type='text'
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                    placeholder='Package Price'
                />
                <input
                    className='pl-10 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4'
                    type='text'
                    value={newPackage.description}
                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                    placeholder='Package description'
                />
                <input
                    className='pl-10 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4'
                    type='text'
                    value={newPackage.features}
                    onChange={(e) => setNewPackage({ ...newPackage, features: e.target.value })}
                    placeholder='Package features'
                />

                <label className='text-white flex gap-2 pl-4'>
                    Available:                
                <input 
                    type='checkbox' 
                    checked={newPackage.available}
                    onChange={(e)=> setNewPackage({ ...newPackage, available: e.target.checked})}
                />
                </label>
                <button className='text-white bg-black p-2 rounded-full hover:bg-white hover:text-black transition duration-1000' 
                        type='submit'
                    >
                            Add Package
                </button>
            </form>
            </div>
        <div className='flex p-2 place-content-center'>
            <ul className='flex flex-wrap text-start gap-4 my-6'>
                {packages.map((paquete)=>(
                    <li className='bg-white/30 backdrop-blur-md p-4 rounded-md' key={paquete.id}>
                        <h3 className='font-bold text-2xl'>{paquete.name}</h3>
                        <span>Price: {paquete.price}</span>
                        <p>Features: {paquete.features.join('')}</p>
                        <p>Description: {paquete.description || 'Non description'}</p>
                        <p>{paquete.available ? 'Available' : 'Not available'}</p>

                        <div className='flex gap-4 p-2'>
                            <button className='p-4 bg-black text-white rounded-md my-4 hover:bg-white hover:text-black transition duration-500' onClick={() => handleUpdatePackage(paquete.id, {available: !paquete.available})}>
                                Change Availability
                            </button>
                            <button className='p-4 bg-[#D40101] text-white rounded-md my-4 hover:bg-[#D40101]/30 transition duration-600' onClick={() => handleDeleteSalon(paquete.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
} 

export default Paquetes