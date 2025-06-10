import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookCard from "../components/BookCard.jsx";
import "../assets/Books.css";

const useQuery = () => new URLSearchParams(useLocation().search);

function Books() {
    const navigate = useNavigate();
    const query = useQuery();
    const location = useLocation();

    const initialSearch = query.get("search") || "";
    const initialCategory = query.get("category") || "";

    const [search, setSearch] = useState(initialSearch);
    const [category, setCategory] = useState(initialSearch ? "" : initialCategory);
    const [books, setBooks] = useState([]);

    // Fetch books when search or category changes
    useEffect(() => {
        const fetchData = async () => {
            const url = new URL("http://localhost:3000/books");

            if (search) url.searchParams.append("search", search);
            else if (category) url.searchParams.append("category", category);

            try {
                const res = await fetch(url.toString());
                if (!res.ok) throw new Error("Data Not Found");
                const data = await res.json();
                setBooks(data);
            } catch (error) {
                console.error(error);
                setBooks([]);
            }
        };

        fetchData();
    }, [search, category]);

    // Sync local state with URL query params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get("search") || "";
        const categoryParam = params.get("category") || "";

        setSearch(searchParam);
        setCategory(searchParam ? "" : categoryParam);
    }, [location.search]);

    // Handle category click
    const handleCategoryClick = (cat) => {
        setCategory(cat);
        setSearch("");
        navigate(`/books?category=${encodeURIComponent(cat)}`);
    };

    return (
        <div className="books-content w-100">
            <div className="browse-layout">
                <div className="categories-sidebar">
                    <h3 className="categories-title">Categories</h3>
                    <div className="category-list">
                        {["All", "Science Fiction", "Comics", "Mystery", "Classic", "Fantasy", "Science", "Movies"].map((cat) => (
                            <button
                                key={cat}
                                className={`category-btn btn ${category === cat ? "active" : ""}`}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="books-grid">
                    {books.map((data) => <BookCard key={data._id} book={data} />)}
                </div>
            </div>
        </div>
    );
}

export default Books;
