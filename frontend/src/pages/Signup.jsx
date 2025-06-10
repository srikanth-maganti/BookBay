import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useContext} from 'react'
import { AuthContext } from '../AuthContext';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import "../assets/Signup.css"
function Signup() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {setisauthenticated}=useContext(AuthContext);
    let navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        setError('');
        try{
        
        let res=await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullname, email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            
            console.log('Signup successful');
            localStorage.setItem("token",data.token);
            setisauthenticated(true);
            navigate('/');
        }
        else{
            throw new Error("Sign up failed");
        }
        }
        catch(err)
        {
            console.log(err.message)
        }

    }

    const handleSignUpSuccess = async (credentialResponse) => {
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
        <div className="signup-content">
            <div className="signup-header">
                <h1>Create Your Account</h1>
                <p>Start shopping with ShopNow today!</p>
            </div>
            <form id="signupForm" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input 
                        type="text" 
                        id="fullName" 
                        name="fullname"
                        placeholder="Enter your full name" 
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label for="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder="Enter your email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder="Create a strong password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signup-btn">
                    Sign Up
                </button>
            </form>
            <div className="mt-1"> 
                         <GoogleLogin onSuccess={handleSignUpSuccess} onError={() => console.log("Login Failed")} />
             </div>

              <div className="mt-2">
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="login-link">
                Already have an account? <a href="/login">Log In</a>
            </div>

        </div>
    </div>

     );
}

export default Signup;