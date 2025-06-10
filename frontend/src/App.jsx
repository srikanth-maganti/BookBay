import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from "./components/Footer.jsx"
import {Outlet} from "react-router-dom"
import { AuthProvider } from './AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const CLIENT_ID="281202687628-047r4063n08fjgs3okr9gbfj6pjpe0af.apps.googleusercontent.com";
function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <AuthProvider> 
      <div className="d-flex flex-column min-vh-100">
        <Navbar/>
        <main className="flex-fill">
          <div className="content container-fluid">
            <Outlet/>
          </div>
        </main>
        
        <Footer/>
      </div> 
    </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
