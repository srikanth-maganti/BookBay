import React, { useState, useEffect } from 'react';
import "../assets/Login.css"
function Login() {
    return ( 
        <div class="main">
        <div class="login-container">
            <h2>Login</h2>
            <form id="loginForm" action="/login" method="post">
                <div class="form-group">
                    <input 
                        type="email" 
                        name="email"
                        id="email" 
                        placeholder="Email" 
                        required
                    />
                </div>
                <div class="form-group">
                    <input 
                        name="password"
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        required
                    />
                </div>
                <button type="submit" class="login-btn">
                    Login
                </button>
            </form>
            <div class="signup-link">
                <a href="/signup">Create New Account</a>
            </div>
        </div>
    
    </div>    

     );
}

export default Login;