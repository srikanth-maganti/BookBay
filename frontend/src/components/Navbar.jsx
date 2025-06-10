import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from "../AuthContext.jsx"
import styled from 'styled-components';


function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState("");
    const { isauthenticated, setisauthenticated } = useContext(AuthContext);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get("search") || "";
        setQuery(searchParam);
    }, [location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed === "") return;

        navigate(`/books?search=${encodeURIComponent(trimmed)}`);
    };

    const handlelogout = () => {
        localStorage.removeItem("token");
        setisauthenticated(false);

    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-light border-bottom fixed-top ">
                <div className="container-fluid d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <Link className="navbar-brand" to="/">
                            <i className="fa-duotone fa-solid fa-book"><b>Project</b></i>
                        </Link>

                        <form className="d-flex w-50" role="search" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2"
                                name="search"
                                id="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>


                        {isauthenticated ? (<div className="d-flex align-items-center gap-3">
                            <Link to={""} className="fs-3 text-dark"><i class="fa-solid fa-user"></i></Link>
                            <button className="btn btn-outline-primary" onClick={handlelogout}>Logout</button>
                            <Link to="/cart" className="btn btn-outline-secondary">
                                <i className="fa-solid fa-cart-shopping"></i> Cart
                            </Link>
                        </div>) :
                            (
                                <div className="d-flex align-items-center gap-3">
                                    <Link to="/login" className="btn btn-outline-primary">Login</Link>
                                </div>
                            )


                        }

                    </div>

                    <StyledWrapper>
                        <div className="container">
                            <div className="tabs">
                                <input type="radio" id="radio-1" name="tabs" defaultChecked />
                                <label className="tab" htmlFor="radio-1">Home</label>
                                <input type="radio" id="radio-2" name="tabs" />
                                <label className="tab" htmlFor="radio-2">Browse Books</label>
                                <input type="radio" id="radio-3" name="tabs" />
                                <label className="tab" htmlFor="radio-3">Sell</label>
                                <span className="glider" />
                            </div>
                        </div>
                    </StyledWrapper>

                    {/* <div className="navbar-collapse mt-2 bg-body-tertiary w-100">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-left w-100">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/books">Browse Books</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/seller">Sell a Book</Link>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;

const StyledWrapper = styled.div`
  .tabs {
    display: flex;
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
    padding: 0.75rem;
    border-radius: 99px;
  }

  .tabs * {
    z-index: 2;
  }

  .container input[type="radio"] {
    display: none;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 50px;
    font-size: .8rem;
    color: black;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
  }

  .notification {
    display: flex;
    align-items: center;
    justify-content: center;
    width: .8rem;
    height: .8rem;
    position: absolute;
    top: 10px;
    left: 30%;
    font-size: 10px;
    margin-left: 0.75rem;
    border-radius: 50%;
    margin: 0px;
    background-color: #e6eef9;
    transition: 0.15s ease-in;
  }

  .container input[type="radio"]:checked + label {
    color: #185ee0;
  }

  .container input[type="radio"]:checked + label > .notification {
    background-color: #185ee0;
    color: #fff;
    margin: 0px;
  }

  .container input[id="radio-1"]:checked ~ .glider {
    transform: translateX(0);
  }

  .container input[id="radio-2"]:checked ~ .glider {
    transform: translateX(100%);
  }

  .container input[id="radio-3"]:checked ~ .glider {
    transform: translateX(200%);
  }

  .glider {
    position: absolute;
    display: flex;
    height: 30px;
    width: 50px;
    background-color: #e6eef9;
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
  }

  @media (max-width: 700px) {

    .tabs {
      transform: scale(0.6);
    }
  }`;