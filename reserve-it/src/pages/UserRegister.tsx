import useAuth from "../components/useAuth"
import LoginPage from "./LoginPage"
import SalonPage from "./Salones"


const UserRegister = () => {
    const user = useAuth();

    return(
        <div> 
        {user ? 
            (
                <>
                <p>
                    Bienvenido, {user.email}
                    <SalonPage/>
                </p>
                </>
            )  : (
                <LoginPage/>
            )
        }
    
        </div>
    )
}

export default UserRegister