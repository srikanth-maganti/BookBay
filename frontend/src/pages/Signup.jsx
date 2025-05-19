import React, { useState, useEffect } from 'react';
function Signup() {
    return ( 
        <div class="main">
        <div class="signup-container">
            <div class="signup-header">
                <h1>Create Your Account</h1>
                <p>Start shopping with ShopNow today!</p>
            </div>
            <form id="signupForm" action="/signup" method="POST">
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input 
                        type="text" 
                        id="fullName" 
                        name="fullname"
                        placeholder="Enter your full name" 
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder="Enter your email" 
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder="Create a strong password" 
                        required
                    />
                </div>
                <button type="submit" class="signup-btn">
                    Sign Up
                </button>
            </form>
            <div class="login-link">
                Already have an account? <a href="/login">Log In</a>
            </div>
        </div>
    </div>

     );
}

export default Signup;