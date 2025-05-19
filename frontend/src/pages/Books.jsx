import React, { useState, useEffect } from 'react';
import BookCard from "../components/BookCard.jsx"
import "../assets/Books.css"
function Books()
{   
    const [books,setBooks]=useState([]);
    const [category,setCategory]=useState("All");
    useEffect(()=>{
       
        const fetchdata=async ()=>{
            
            const response=await fetch(`http://localhost:3000/books?category=${category}`);
            const result=await response.json();
            setBooks(result);
        }
        fetchdata();
    },[category]);

    
    return(
        <div className="container-fluid contain">
        <div className="browse-layout">
            
            <div className="categories-sidebar">
                <h3 className="categories-title">Categories</h3>
                <div className="category-list">
                    <button className="category-btn btn" id="All" onClick={()=>{setCategory("All")}}>All Books</button>
                    <button className="category-btn btn" id="Science Fiction" onClick={()=>{setCategory("Science Fiction")}}>Science Fiction</button>
                    <button className="category-btn btn" id="Comics" onClick={()=>setCategory("Comics")}>Comics</button>
                    <button className="category-btn btn" id="Mystery" onClick={()=>setCategory("Mystery")}>Mystery</button>
                    <button className="category-btn btn" id="classNameic" onClick={()=>{setCategory("Classic")}}>Classic</button>
                    <button className="category-btn btn" id="Fantasy" onClick={()=>{setCategory("Fantasy")}}>Fantasy</button>                    <button className="category-btn btn" id="Science" onClick={()=>{setCategory("Science")}}>Science</button>
                    <button className="category-btn btn" id="Romance" onClick={()=>{setCategory("Movies")}}>Movies</button>
                </div>
            </div>
     
             
            <div className="books-grid">
                {
                    books.map((data)=>(<BookCard book={data}/>))
                }
            </div>
        </div>
     </div>

    )
}

export default Books
