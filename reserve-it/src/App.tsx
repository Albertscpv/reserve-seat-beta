import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar";
import Home from "../src/pages/Home"
import Paquetes from "../src/pages/Paquetes"
import Salones from "../src/pages/Salones"
import Contacto from "../src/pages/Contacto"
import UserRegister from "./pages/UserRegister";


const App = () => {

  return (
    <>
      <Router>
        <main className="min-h-screen">
          <NavBar/>
          <Routes>
            <Route path="/"         element={<Home/>}/>
            <Route path="/paquetes"  element={<Paquetes/>} />
            <Route path="/salones" element={<Salones/>}/>
            <Route path="/contacto" element={<Contacto/>}/>
            <Route path="/userRegister" element={<UserRegister/>}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
