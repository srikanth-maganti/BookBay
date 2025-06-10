import React, { useState, useEffect } from 'react';
import "../assets/Error.css"
function Error() {
    return ( 

        <div class="error-content">
            <svg class="shopping-cart" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            
            <h1 class="error-message">Oops!message</h1>
           
            <div class="button-group">
                <a href="/" class="button primary-button">Back to Home</a>
                <a href="/books?category=All" class="button secondary-button">Browse Products</a>
            </div>
        </div>


     )
}

export default Error;