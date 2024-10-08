import useUserRole from "../hooks/useUserRole"

import AdminSalones from "../adminPages/AdminSalones"
import UserSalones from "../userPages/UserSalones"

const SalonesPage = () => {
    const role = useUserRole();

    if(role===null){
        return <div>Loading...</div>; //Need loader component
    }

    return (
        <div>
            {role === 'admin' ? <AdminSalones/> : <UserSalones/>}
        </div>
    )
} 
export default SalonesPage;

