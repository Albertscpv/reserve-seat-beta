import { useEffect, useState } from "react";
import { auth, db } from "/workspaces/reserve-seat-beta/reserve-it/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

const useUserRole = () => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(()=>{
        const fetchUserRol = async () =>{

        const user = auth.currentUser;
        if(user){
            const userDoc = await getDoc(doc(db, "users", user.uid))
            const userData = userDoc.data();

            if(userData?.role){
                setRole(userData.role)
            }
        }
    }
    fetchUserRol();
    },[])

    return role;
};

export default useUserRole;
