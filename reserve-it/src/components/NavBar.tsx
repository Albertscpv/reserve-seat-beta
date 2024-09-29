import { Link } from "react-router-dom"
import Logout from "./Logout";

const NavBar = () => {
    const navLinks = [
        {title: 'Home', path: '/'},
        {title: 'Salones', path: '/Salones'},
        {title: 'Paquetes', path: '/Paquetes'},
        {title: 'Contacto', path: '/Contacto'},
        {title: 'Register', path: '/userRegister'}
    ];
    return(
        <>
        <ul className="flex text-white gap-4 mb-16">
            {navLinks.map((navLink => (
                <li key={navLink.path}>
                    <Link to={navLink.path}>{navLink.title}</Link>
                </li>                
            )))}
            <Logout/>
        </ul>
        </>
    )

}

export default NavBar;