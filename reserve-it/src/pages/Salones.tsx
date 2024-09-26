import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from "/workspaces/reserve-seat-beta/reserve-it/firebaseConfig.js"

function Salones (){
    const [ salon, setSalon ] = useState('');
    const [ salones, setSalones] = useState([]);

 
    return(
        <>
        <h2>
            
        </h2>
        
        </>
    )
} 

export default Salones