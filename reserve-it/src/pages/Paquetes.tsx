import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.ts'; // Asegúrate de usar el archivo firebaseConfig.ts

interface Package{
    id: string;
    name:string;
    price: number;
    description:string;
    features:string[];
    available:boolean;
}


function Paquetes (){

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
            <div>
                <h2>Gestion de Paquetes</h2>
            </div>
            <form onSubmit={handleAddPackage} className='text-black flex gap-4 justify-center'>
                <input
                    type='text'
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                    placeholder='Package Name'
                />
                <input
                    type='text'
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                    placeholder='Package Price'
                />
                <input
                    type='text'
                    value={newPackage.description}
                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                    placeholder='Package description'
                />
                <input
                    type='text'
                    value={newPackage.features}
                    onChange={(e) => setNewPackage({ ...newPackage, features: e.target.value })}
                    placeholder='Package features'
                />

                <label className='text-white flex gap-2'>
                    Available:
                <input 
                    type='checkbox' 
                    checked={newPackage.available}
                    onChange={(e)=> setNewPackage({ ...newPackage, available: e.target.checked})}
                />
                </label>
                <button className='text-black bg-sky-200 p-2 rounded-full' type='submit'>Add Package</button>
            </form>

            <ul className='flex gap-4 text-start'>
                {packages.map((paquete)=>(
                    <li key={paquete.id}>
                        <h3>{paquete.name}</h3>
                        <span>Price: {paquete.price}</span>
                        <p>Features: {paquete.features.join('')}</p>
                        <p>Description: {paquete.description || 'Non description'}</p>
                        <p>{paquete.available ? 'Available' : 'Not available'}</p>

                        <div className='flex gap-4'>
                            <button className='p-4 bg-sky-200 text-black rounded-full my-4' onClick={() => handleUpdatePackage(paquete.id, {available: !paquete.available})}>
                                Change Availability
                            </button>
                            <button className='p-4 bg-sky-200 text-black rounded-full my-4' onClick={() => handleDeleteSalon(paquete.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
} 

export default Paquetes