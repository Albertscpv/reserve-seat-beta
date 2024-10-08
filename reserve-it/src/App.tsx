import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar";

const Home = lazy(() => import("./mainPages/Home"))
const PaquetesPage = lazy(() =>import("./mainPages/PaquetesPage")) 
const SalonesPage = lazy(() => import("./mainPages/SalonesPage")) 
const Contacto = lazy(()=> import("./mainPages/Contacto")) 
const UserRegister = lazy(() => import("./authPages/UserRegister"))

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
            <Route path="/paquetes"     element={<PaquetesPage/>} />
            <Route path="/salones"      element={<SalonesPage/>}/>
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
