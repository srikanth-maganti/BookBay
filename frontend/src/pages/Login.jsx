import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import { AuthContext } from '../AuthContext';
import { jwtDecode} from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google';
import "../assets/Login.css"
function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const navigate = useNavigate();
    const {isauthenticated,setisauthenticated} =useContext(AuthContext);
    const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

     

      if (res.ok) {
        const data = await res.json();
        
        
        localStorage.setItem("token", data.token);
        setisauthenticated(true);
        navigate('/');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError("something went wrong");
    }
  };

  const handleLoginSuccess = async (credentialResponse) => {
      const token = credentialResponse.credential;
      const userInfo = jwtDecode(token);
      console.log("Google user:", userInfo);

      // Send token to backend
      const res = await fetch(`http://localhost:3000/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setisauthenticated(true);
      navigate("/");
  };

    return ( 
       <div className="main">
        <div className="login-content">
            <h2>Login</h2>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="email" 
                        name="email"
                        id="email" 
                        placeholder="Email" 
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        name="password"
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
            <div className="mt-2"> 
              <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login Failed")} />
            </div>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
             
            <div className="signup-link">
                <a href="/signup">Create New Account</a>
            </div>
        </div>
        </div>
    
    

     );
}

export default Login;