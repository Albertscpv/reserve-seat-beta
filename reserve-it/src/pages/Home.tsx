import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
    
    const handleStartPage = () =>{
        navigate('/salones')
    }

    return(
        <>
            <div id='content-box' className='relative h-screen p-2'>
                <div className='[grid-area:main] p-12 place-content-center'>
                    <h2 className="font-bold text-4xl ">Bienvenido a tu administrador de eventos</h2>
                            <p>Creando soluciones eficientes.</p>
                            <button onClick={handleStartPage} className="px-6 py-2 bg-white text-black mt-2 rounded-2xl">Iniciar</button>
                </div>
            </div>

       </>
    )
} 

export default Home