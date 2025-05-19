import React, { useState, useEffect } from 'react';
import "../assets/Cart.css"
function Cart() {
    const [books,setBook]=useState([]);

    useEffect(()=>{
        const fetchdata=async()=>{
            const response=await fetch();
            const result=await response.json();
            setBook(result);
        }
    },[])

    return ( 
       
        <div class="cart-container">
        
        <h1 class="cart-title">
            
            <i class="fas fa-shopping-cart"></i>
            Shopping Cart Items  
        </h1>
        
        <div class="row">
            <div class="col-lg-8">
                
                {
                    books.map((data)=><CartItem book={data}/>)
                }
                
                <a href="/books" class="continue-shopping">
                    <i class="fas fa-arrow-left"></i> Continue Shopping
                </a>
            </div>

             {/* Cart Summary  */}
             
            <div class="col-lg-4">
                <div class="cart-summary">
                    <h2 class="summary-title">Order Summary</h2>
                    <div class="summary-item">
                        <span>Subtotal items</span>
                        <span>total</span>
                    </div>
                    <div class="summary-item">
                        <span>Shipping</span>
                        <span>₹24</span>
                    </div>
                    <div class="summary-item">
                        <span>Tax</span>
                        <span>₹12</span>
                    </div>
                    <div class="summary-total">
                        <span>Total</span>
                        <span>₹ total+24+12</span>
                    </div>
                    <form action="/cart/payment">
                    <button class="checkout-btn">
                        Proceed to Checkout
                    </button>
                </form>
                </div>
            </div>
       
        </div>
        
        
       
        <div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any books to your cart yet.</p>
            <a href="/books" class="btn btn-primary mt-3">
                Start Shopping
            </a>
        </div>
        
    </div>


     );
}

export default Cart;