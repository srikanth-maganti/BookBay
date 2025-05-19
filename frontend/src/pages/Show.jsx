import React, { useState } from 'react';
import { ShoppingCart, Star, CheckCircle } from 'lucide-react';

// Mock data (you would typically fetch this from an API or pass as props)
const bookData = {
    title: "Sample Book Title",
    author: "John Doe",
    price: "$12.99",
    image: "/api/placeholder/400/600",
    isbn: "978-0316769488",
    language: "English",
    pages: 234,
    publisher: "Little, Brown and Company",
    publicationYear: 1991,
    description: "Minor wear on corners, no highlighting or notes inside. Second edition from 1992. The book is in good condition and all pages are intact. The spine may show signs of wear. Some scuffing may be present on the cover, which is normal for used books.",
    thumbnails: [
        "/api/placeholder/150/200",
        "/api/placeholder/150/200", 
        "/api/placeholder/150/200", 
        "/api/placeholder/150/200"
    ],
    reviews: [
        {
            name: "Sarah M.",
            rating: 5,
            date: "February 15, 2024",
            text: "Book arrived in excellent condition, exactly as described."
        },
        {
            name: "John D.",
            rating: 4,
            date: "February 10, 2024", 
            text: "Good price for a classic. Some wear but perfectly readable."
        }
    ],
    relatedBooks: [
        {
            title: "1984",
            author: "George Orwell",
            price: "$7.99",
            image: "/api/placeholder/200/300"
        },
        {
            title: "Brave New World",
            author: "Aldous Huxley", 
            price: "$6.99",
            image: "/api/placeholder/200/300"
        },
        {
            title: "Animal Farm",
            author: "George Orwell",
            price: "$5.99", 
            image: "/api/placeholder/200/300"
        }
    ]
};

// Star Rating Component
const StarRating = ({ rating, total = 5 }) => {
    return (
        <div className="flex items-center text-yellow-500">
            {[...Array(total)].map((_, index) => (
                <Star 
                    key={index} 
                    className={`w-5 h-5 ${index < rating ? 'fill-current' : 'stroke-current'}`} 
                />
            ))}
        </div>
    );
};

// Book Details Page Component
const BookDetailsPage = () => {
    const [mainImage, setMainImage] = useState(bookData.image);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleThumbnailClick = (thumbnail) => {
        setMainImage(thumbnail);
    };

    const handleAddToCart = () => {
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
    };

    return (
        <div className="container max-w-6xl mx-auto px-4 py-8">
            {/* Book Details Section */}
            <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-md mb-8">
                {/* Image Gallery */}
                <div>
                    <img 
                        src={mainImage} 
                        alt="Book Cover" 
                        className="w-full h-[500px] object-cover rounded-lg mb-4 transition-opacity duration-300"
                    />
                    <div className="grid grid-cols-4 gap-2">
                        {bookData.thumbnails.map((thumbnail, index) => (
                            <img 
                                key={index}
                                src={thumbnail} 
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-70"
                                onClick={() => handleThumbnailClick(thumbnail)}
                            />
                        ))}
                    </div>
                </div>

                {/* Book Information */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">{bookData.title}</h1>
                    <p className="text-xl text-gray-600 mb-4">{bookData.author}</p>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <StarRating rating={4.5} />
                        <span className="ml-2 text-gray-600">(842 reviews)</span>
                    </div>

                    {/* Price Section */}
                    <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-800 mr-4">{bookData.price}</span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">52% OFF</span>
                    </div>

                    <p className="text-gray-600 mb-2"><strong>Condition:</strong> Good</p>
                    <p className="text-gray-600 mb-4"><strong>Seller:</strong> BookLover123</p>

                    {/* Add to Cart Button */}
                    <button 
                        onClick={handleAddToCart}
                        className={`w-full py-4 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 
                            ${isAddedToCart ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {isAddedToCart ? (
                            <>
                                <CheckCircle className="w-6 h-6" />
                                <span>Added to Cart</span>
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-6 h-6" />
                                <span>Add to Cart</span>
                            </>
                        )}
                    </button>

                    {/* Book Details */}
                    <div className="bg-gray-50 p-4 rounded-lg mt-6">
                        <h3 className="text-xl font-semibold mb-4">Book Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "ISBN", value: bookData.isbn },
                                { label: "Language", value: bookData.language },
                                { label: "Pages", value: bookData.pages },
                                { label: "Publisher", value: bookData.publisher },
                                { label: "Publication Year", value: bookData.publicationYear }
                            ].map((detail, index) => (
                                <div key={index}>
                                    <p className="font-bold text-gray-600">{detail.label}:</p>
                                    <p>{detail.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <p>{bookData.description}</p>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    {bookData.reviews.map((review, index) => (
                        <div 
                            key={index} 
                            className={`border-b border-gray-200 py-4 ${index === bookData.reviews.length - 1 ? 'border-b-0' : ''}`}
                        >
                            <div className="flex items-center gap-4 mb-2 flex-wrap">
                                <span className="font-bold">{review.name}</span>
                                <StarRating rating={review.rating} />
                                <span className="text-gray-600 text-sm">{review.date}</span>
                            </div>
                            <p>{review.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Related Books Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Books</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {bookData.relatedBooks.map((book, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2"
                        >
                            <img 
                                src={book.image} 
                                alt={book.title} 
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{book.title}</h3>
                                <p className="text-gray-600">{book.author}</p>
                                <p className="text-xl font-bold text-gray-800 mt-2">{book.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BookDetailsPage;