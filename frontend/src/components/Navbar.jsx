import React from "react"

function Navbar()
{
    return(
      <header>
    <nav className="navbar navbar-expand-lg bg-body-light border-bottom fixed-top">
    <div className="container-fluid d-flex flex-column">
       
        <div className="d-flex justify-content-between align-items-center w-100">
           
            <a className="navbar-brand" href="/"><i className="fa-duotone fa-solid fa-book"><b>Project</b> </i></a>
            
            
            <form className="d-flex w-50" role="search" action="/books/search" method="post">
                <input className="form-control me-2 " name="search" id="search"  placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            
            
            <div className="d-flex align-items-center gap-3">
                <a href="/login" className="btn btn-outline-primary">Login</a>
                <a href="/cart" className="btn btn-outline-secondary">
                    <i className="fa-solid fa-cart-shopping"></i> Cart
                </a>
            </div>
        </div>
        
        
        <div className="navbar-collapse mt-2 bg-body-tertiary w-100">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-left w-100">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/books?category=All">Browse Books</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/seller">Sell a Book</a>
                </li>
                
            </ul>
        </div>
    </div>
</nav>
</header>  


    )
}

export default Navbar