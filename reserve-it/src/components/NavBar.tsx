import { Link } from "react-router-dom"

function NavBar(){
    const navLinks = [
        {title: 'Home', path: '/'},
        {title: 'Salones', path: '/Salones'},
        {title: 'Paquetes', path: '/Paquetes'},
        {title: 'Contacto', path: '/Contacto'}
    ];
    return(
        <>
        <ul className="flex text-white gap-4 mb-16">
            {navLinks.map((navLink => (
                <li key={navLink.path}>
                    <Link to={navLink.path}>{navLink.title}</Link>
                </li>                
            )))}
        </ul>
        </>
    )

}

export default NavBar;