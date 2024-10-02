import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar";

const Home = lazy(() => import("../src/pages/Home"))
const Paquetes = lazy(() =>import("../src/pages/Paquetes")) 
const Salones = lazy(() => import("../src/pages/Salones")) 
const Contacto = lazy(()=> import("../src/pages/Contacto")) 
const UserRegister = lazy(() => import("../src/pages/UserRegister"))

import Footer from "../src/components/Footer" 
import Loader from "./components/Loader";


const App = () => {

  return (
    <>
      <Router>
        <main className="min-h-screen">
          <NavBar/>
          <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/"             element={<Home/>}/>
            <Route path="/paquetes"     element={<Paquetes/>} />
            <Route path="/salones"      element={<Salones/>}/>
            <Route path="/contacto"     element={<Contacto/>}/>
            <Route path="/userRegister" element={<UserRegister/>}/>
          </Routes>
          </Suspense>
        </main>
        <Footer/>
      </Router>
    </>
  )
}

export default App
