import React, { useState, useEffect } from 'react';
import "../assets/Sell.css"
function Sell() {
    return ( 
        <div class="form-container">
        <form action="/books" method="post">
            <label for="title" class="form-label">Title:</label>
            <input type="text"  id="title" name="book[Title]"  class="form-control" required/>
    
            <label for="author" class="form-label">Author:</label>
            <input type="text" id="author" name="book[Author]" class="form-control" required/>
    
            <label for="isbn" class="form-label">ISBN:</label>
            <input type="text" id="isbn" name="book[ISBN]" class="form-control" required/>
    
            <label for="language" class="form-label">Langauge:</label>
            <input type="text" id="language" name="book[Language]" class="form-control" required/>
    
            <label for="quantity" class="form-label">Quantity:</label>
            <input type="number" id="quantity" name="book[Quantity]" class="form-control" required/>
    
            <label for="category" class="form-label">Category:</label>
            <select name="book[Category]" id="category" class="form-select">
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Comic">Comic</option>
                <option value="Fiction">Fiction</option>
                <option value="Romantic">Romantic</option>
            </select>
            
            <label for="image" class="form-label">Image:</label>
            <input type="text" name="book[Image]" class="form-control"/>
    
            <label for="price" class="form-label">Price:</label>
            <input type="number" id="price" name="book[Price]" class="form-control" required/>
    
            <label for="condition" class="form-label">Condition:</label>
            <input type="text" id="condition" name="book[Condition]" class="form-control" />
    
            <label for="pages" class="form-label">Pages</label>
            <input type="number" id="pages" name="book[Pages]" class="form-control" />
    
            <label for="description" class="form-label">Description:</label>
            <textarea name="book[Description]" id="description" class="form-control"></textarea>
    
    
            <label for="publisher" class="form-label">Publisher:</label>
            <input type="text" id="publisher" name="book[Publisher]" class="form-control"/>
    
            <label for="published" class="form-label">Published:</label>
            <input type="text" id="published" name="book[PublishedYear]" class="form-control"/>
    
           
            <div class="btns">
                <button type="submit"  class="submit btn btn-primary">SUBMIT</button>
                <button type="reset"  class="reset btn btn-warning">RESET</button>
            </div>
            
        </form>
    </div>

     );
}

export default Sell;