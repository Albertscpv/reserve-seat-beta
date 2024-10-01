import { Link } from "react-router-dom"
import Logout from "./Logout";

const NavBar = () => {
    const navLinks = [
        {title: 'Home', path: '/'},
        {title: 'Salones', path: '/Salones'},
        {title: 'Paquetes', path: '/Paquetes'},
        {title: 'Contacto', path: '/Contacto'},
    ];
    return(
        <>
        <div className="flex flex-row bg-white/40 p-6 mb-16">
        <ul className="flex text-white gap-4 flex-grow">
            {navLinks.map((navLink => (
                <li key={navLink.path}>
                    <Link to={navLink.path}>{navLink.title}</Link>
                </li>                
            )))}
        </ul>
        <div>
                <Logout/>
            </div>
        </div>
        </>
    )

}

export default NavBar;