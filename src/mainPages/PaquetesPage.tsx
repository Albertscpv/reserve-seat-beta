import useUserRole from "../hooks/useUserRole"

import AdminPaquetes from "../adminPages/AdminPaquetes"
import UserPaquetes from "../userPages/UserPaquetes"

const PaquetesPage = () => {
    const role = useUserRole();

    if(role===null){
        return <div>Loading...</div>; //Need loader component
    }

    return (
        <div>
            {role === 'admin' ? <AdminPaquetes/> : <UserPaquetes/>}
        </div>
    )
} 
export default PaquetesPage;

