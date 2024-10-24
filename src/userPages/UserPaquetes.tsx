import { useState, useEffect } from 'react';
import { collection,  getDocs } from 'firebase/firestore';
import { db } from '/workspaces/reserve-seat-beta/firebaseConfig.ts';
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

    const fetchPackages = async () =>{
        const querySnapshot = await getDocs(collection(db, 'paquetes'))
        const packageArray: Package[] = [];
        querySnapshot.forEach((doc)=>{
            packageArray.push( { id: doc.id, ...doc.data() } as Package)
        });
        setPackages(packageArray);
    }
        useEffect(() => {
            fetchPackages();
        }, [])

    return(
        <>  
            <h2 className='text-2xl font-bold'>Paquetes Disponibles</h2>
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
                            <button className='p-4 bg-black text-white rounded-md my-4 hover:bg-white hover:text-black transition duration-500' >
                                Change Availability
                            </button>
                            <button className='p-4 bg-[#D40101] text-white rounded-md my-4 hover:bg-[#D40101]/30 transition duration-600'>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
} 

export default Paquetes