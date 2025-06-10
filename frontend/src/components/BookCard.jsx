import React from 'react'
import {Link} from 'react'
import "../assets/BookCard.css"
function BookCard({book})
{
    return (
            <div className="book-card my-2">
                        <div className="book-image">
                            <img src={book.Image} alt={book.Title}/>
                             <div className="quick-actions">
                                <a className="quick-view btn" href={`/books/show/${book._id}`} >Quick View  </a>
                            </div> 
                        </div>
                        <div className="book-info">
                            <h4 className="book-title">{book.Title}</h4>
                            <div className="book-meta">
                                <span className="book-category">{book.Category}</span>
                                <span className="book-price">₹ {book.Price}</span>
                            </div>
                        </div>
            </div>
    )
}
export default BookCard