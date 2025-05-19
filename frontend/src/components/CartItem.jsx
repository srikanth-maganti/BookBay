import React from 'react';
import {useState,useEffect} from "react"

function CartItem({book})
{   
    return(
               <div class="cart-item">
                    <div class="row align-items-center">
                        <div class="col-md-2 m-2 col-4">
                            <img src={book.Image} alt="Book Cover" class="item-image"/>
                        </div>
                        <div class="col-md-6 col-8">
                            <div class="item-details">
                                <div>
                                    <a href="/books/show/<%=book._id%>" class="item-title"> {book.Title}</a>
                                    <p class="item-author">{book.Author}</p>
                                    <p class="item-condition">Condition: Good</p>
                                </div>
                                <div class="quantity-control">
                                    <form action="/cart/<%=book._id %>?_method=PATCH" method="post">
                                        <div class="d-flex">
                                        <button class="quantity-btn" type="submit" name="action" value="decrement">-</button>
                                        <input type="number" class="quantity-input" name="count" value="<%=book.Count%>" min="1"/>
                                        <button class="quantity-btn" type="submit" name="action" value="increment">+</button>
                                       </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mt-3 mt-md-0">
                            <div class="text-md-end">
                                <p class="item-price">₹{book.Price}</p>
                                <form action="/cart/<%=book._id%>?_method=DELETE" method="post">
                                <button class="remove-btn" type="submit">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
    )
}
export default CartItem