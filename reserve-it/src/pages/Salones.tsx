import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from "/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.js"

interface Salon{
    id:string;
    name:string;
    description?:string;
    features:string[];
    available:boolean;
}

function Salones (){
    const [salones, setSalones] = useState<Salon[]>([]);
    const [newSalon, setNewSalon] = useState({ name: '', description: '', features: '', available: false })


    const fetchSalones = async () => {
        const querySnapshot = await getDocs(collection(db, 'salones'))
        const salonesArray: Salon[] = [];

        querySnapshot.forEach((doc) => {
            salonesArray.push({id: doc.id, ...doc.data()} as Salon);
        });
        setSalones(salonesArray)
    }

 
    return(
        <>
        <h2>
            
        </h2>
        
        </>
    )
} 

export default Salones