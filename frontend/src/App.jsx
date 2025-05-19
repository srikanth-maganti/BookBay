import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar.jsx'
import Footer from "./components/Footer.jsx"
import {Outlet} from "react-router-dom"

function App() {
  return (
    <>  
        <Navbar/>
        <div className="container-fluid main-container">
        <Outlet/>
        </div>
        <Footer/>
    </>
  )
}

export default App
