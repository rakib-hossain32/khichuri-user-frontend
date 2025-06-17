import React, { useState, useEffect } from 'react';
import './index.css'; // Import the CSS file

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Product data (বাংলায় নাম ও বিবরণ)
// This will be fetched from backend, but keeping a local copy for fallback/structure idea
const mockProducts = [
    { _id: '654f5a89d70e4c2b918f0a00', name: "গরুর মাংস খিচুড়ি", description: "সুস্বাদু গরুর মাংস এবং মশলা দিয়ে তৈরি মজাদার খিচুড়ি। এটি আপনার ক্ষুধা নিবারণ করবে এবং একটি সম্পূর্ণ খাবার হিসাবে কাজ করবে। আমরা সেরা মানসম্মত গরুর মাংস এবং প্রাকৃতিক মশলা ব্যবহার করি।", price: 250, discount: 10, image: "https://placehold.co/600x400/6B8E23/FFFFFF?text=Beef+Khichuri", recipe: "প্রথমে চাল এবং ডাল পরিষ্কার করুন। তারপর একটি পাত্রে তেল গরম করুন এবং পেঁয়াজ, আদা, রসুন দিয়ে ভাজুন। এরপর মাংস যোগ করুন এবং ভালো করে ভাজুন। তারপর চাল, ডাল, মশলা এবং পানি যোগ করুন এবং সিদ্ধ করুন।" },
    { _id: '654f5a89d70e4c2b918f0a01', name: "ডিম খিচুড়ি", description: "ডিম এবং সবজি দিয়ে তৈরি হালকা ও পুষ্টিকর খিচুড়ি। সকাল বা বিকালের নাস্তার জন্য উপযুক্ত। শিশুরা এটি খুব পছন্দ করে।", price: 180, discount: 0, image: "https://placehold.co/600x400/FFD700/6B8E23?text=Egg+Khichuri" },
    { _id: '654f5a89d70e4c2b918f0a02', name: "নিরামিষ খিচুড়ি", description: "বিভিন্ন ধরণের তাজা সবজি দিয়ে তৈরি স্বাস্থ্যকর নিরামিষ খিচুড়ি। যারা নিরামিষ পছন্দ করেন তাদের জন্য এটি একটি দারুণ বিকল্প।", price: 200, discount: 5, image: "https://placehold.co/600x400/FDF9F3/6B8E23?text=Veg+Khichuri" },
    { _id: '654f5a89d70e4c2b918f0a03', name: "মুরগির মাংস খিচুড়ি", description: "দেশি মুরগির মাংসের অসাধারণ স্বাদে ভরপুর এই খিচুড়ি আপনার মন জয় করবে। পারিবারিক ভোজ বা বন্ধুদের সাথে আড্ডার জন্য আদর্শ।", price: 220, discount: 0, image: "https://placehold.co/600x400/6B8E23/FFFFFF?text=Chicken+Khichuri" },
    { _id: '654f5a89d70e4c2b918f0a04', name: "ভুনা খিচুড়ি", description: "বিশেষ মশলা এবং কৌশলে তৈরি ভুনা খিচুড়ি, এক অন্যরকম স্বাদ। প্রতিটি দানা যেন স্বাদের বিস্ফোরণ ঘটায়।", price: 230, discount: 8, image: "https://placehold.co/600x400/FFD700/6B8E23?text=Bhuna+Khichuri" },
    { _id: '654f5a89d70e4c2b918f0a05', name: "মশলা খিচুড়ি", description: "একদম গরম গরম এবং মশলাদার খিচুড়ি যা আপনার মন চাঙ্গা করে তুলবে। শীতের সন্ধ্যায় এর স্বাদ অতুলনীয়।", price: 190, discount: 0, image: "https://placehold.co/600x400/FDF9F3/6B8E23?text=Spicy+Khichuri" }
];

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentView, setCurrentView] = useState('home'); // 'home', 'productDetail', 'contact'
    const [selectedProduct, setSelectedProduct] = useState(null); // For product detail view
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [notification, setNotification] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('info'); // To control notification color
    const [reviews, setReviews] = useState({}); // Stores reviews for each product by _id


    // New state for contact form
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Re-added useState hook for reviewForm and setReviewForm
    const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '', author: '' });

    // --- Fetch Products from Backend ---
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.length > 0) {
                    setProducts(data);
                } else {
                    // Fallback to mock data if backend returns empty (for initial setup)
                    setProducts(mockProducts);
                    console.warn("Backend products array is empty, falling back to mock data.");
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts(mockProducts); // Fallback to mock data on error
                showCustomMessage('প্রোডাক্ট লোড করতে সমস্যা হয়েছে। মক ডেটা ব্যবহার করা হচ্ছে।', 'error');
            }
        };
        fetchProducts();
    }, []);

    // --- Custom Notification Message ---
    const showCustomMessage = (message, type = 'info') => {
        setNotification(message);
        setNotificationType(type);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    // --- Cart Functionality ---
    const addToCart = (productId, quantity) => {
        const product = products.find(p => p._id === productId);
        if (product) {
            const existingItemIndex = cart.findIndex(item => item._id === productId);
            if (existingItemIndex > -1) {
                const updatedCart = [...cart];
                updatedCart[existingItemIndex].quantity += quantity;
                setCart(updatedCart);
            } else {
                setCart([...cart, { ...product, quantity }]);
            }
            showCustomMessage('কার্টে যোগ করা হয়েছে!', 'success');
        } else {
            console.error('Product not found in products array for ID:', productId);
            showCustomMessage('প্রোডাক্ট কার্টে যোগ করা যায়নি।', 'error');
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item._id !== productId));
        showCustomMessage('কার্ট থেকে আইটেম সরানো হয়েছে!', 'info');
    };

    const calculateCartTotal = () => {
        return cart.reduce((sum, item) => {
            const effectivePrice = item.price * (1 - (item.discount || 0) / 100);
            return sum + (effectivePrice * item.quantity);
        }, 0).toFixed(2);
    };

    // --- Order Submission ---
    const handleOrderSubmit = async (orderData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}. Message: ${errorData.message || 'Unknown error'}`);
            }
            setCart([]); // Clear cart after successful order
            setIsCartModalOpen(false);
            showCustomMessage('আপনার অর্ডার সফল হয়েছে!', 'success');
        } catch (error) {
            console.error('Error placing order:', error);
            showCustomMessage('অর্ডার দিতে সমস্যা হয়েছে।', 'error');
        }
    };

    // --- Review System (Mock) ---
    const submitReview = async (productId, reviewData) => {
        const { rating, comment, author } = reviewData;
        if (!rating || !comment || !author) {
            showCustomMessage('রেটিং, মন্তব্য এবং আপনার নাম আবশ্যক।', 'error');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating, comment, author }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'পর্যালোচনা জমা দিতে ব্যর্থ হয়েছে' }));
                throw new Error(errorData.message || 'পর্যালোচনা জমা দিতে ব্যর্থ হয়েছে');
            }

            const newReview = await response.json();

            const updatedReviews = [...(reviews[productId] || []), newReview];
            setReviews(prevReviews => ({ ...prevReviews, [productId]: updatedReviews }));

            showCustomMessage('আপনার পর্যালোচনা সফলভাবে জমা দেওয়া হয়েছে!', 'success');
        } catch (error) {
            console.error('Error submitting review:', error);
            showCustomMessage(error.message || 'পর্যালোচনা জমা দিতে একটি ত্রুটি ঘটেছে।', 'error');
        }
    };

    // --- Contact Form Submission ---
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactForm),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}. Message: ${errorData.message || 'Unknown error'}`);
            }
            setContactForm({ name: '', email: '', message: '' }); // Clear form
            showCustomMessage('আপনার মেসেজ সফলভাবে পাঠানো হয়েছে!', 'success');
        } catch (error) {
            console.error('Error sending message:', error);
            showCustomMessage('মেসেজ পাঠাতে সমস্যা হয়েছে।', 'error');
        }
    };
    

    // --- UI Components ---
    const Header = () => (
        <header className="bg-gradient-to-r from-green-400 to-green-600 p-4 shadow-xl sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center flex-wrap">
                <a href="#home" onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="text-3xl font-extrabold text-gray-800 tracking-wide hover:text-white transition duration-300 transform hover:scale-105">খিচুড়ি ঘর</a>
                
                {/* Hamburger Button */}
                <div className="block md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 hover:text-white focus:outline-none">
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                    </button>
                </div>

                {/* Menu Links */}
                <div className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'} mt-4 md:mt-0`}>
                    <div className="flex flex-col md:flex-row md:space-x-8 text-gray-800 text-lg font-semibold items-center">
                        <a href="#home" onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="block md:inline-block py-2 md:py-0 hover:text-white transition duration-300">হোম</a>
                        <a href="#products" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                            setIsMenuOpen(false);
                        }} className="block md:inline-block py-2 md:py-0 hover:text-white transition duration-300">প্রোডাক্টস</a>
                        <a href="#contact-home" onClick={(e) => {
                            e.preventDefault();
                            setCurrentView('home');
                            setTimeout(() => {
                                document.getElementById('contact-home')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                            setIsMenuOpen(false);
                        }} className="block md:inline-block py-2 md:py-0 hover:text-white transition duration-300">যোগাযোগ</a>
                        <button onClick={() => { setIsCartModalOpen(true); setIsMenuOpen(false); }} className="relative inline-flex items-center justify-center h-14 w-14 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-50 ml-4">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4CAF50_0%,#98FF98_50%,#F5F5F5_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white text-xl font-medium text-gray-800 backdrop-blur-3xl">
                                <i className="fas fa-shopping-cart"></i>
                            </span>
                            {cart.length > 0 && (
                                <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center z-10">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );

    const Footer = () => (
        <footer className="bg-gray-800 text-white p-6 text-center rounded-t-xl shadow-inner">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center space-x-6 mb-4 text-md">
                    <a href="#" className="hover:text-green-400 transition duration-300">সাইট ম্যাপ</a>
                    <a href="#" className="hover:text-green-400 transition duration-300">টার্মস</a>
                    <a href="#" className="hover:text-green-400 transition duration-300">প্রাইভেসি পলিসি</a>
                </div>
                <p>&copy; {new Date().getFullYear()} খিচুড়ি ঘর। সর্বস্বত্ব সংরক্ষিত।</p>
            </div>
        </footer>
    );

    const ProductCard = ({ product }) => {
        const productReviews = reviews[product._id] || [];
        const reviewCount = productReviews.length;
        const averageRating = reviewCount > 0
            ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount)
            : 0;

        const [isExpanded, setIsExpanded] = useState(false);

        const toggleExpand = () => {
            setIsExpanded(!isExpanded);
        };

        return (
            <div className="card-bg rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 duration-300 flex flex-col" onClick={() => { setSelectedProduct(product); setCurrentView('productDetail'); }}>
                <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    {product.discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                            {product.discount}% ডিসকাউন্ট
                        </span>
                    )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 h-16 overflow-hidden">{product.name}</h3>
                    <p className={`text-gray-700 text-sm mb-4 flex-grow ${isExpanded ? "block" : "line-clamp-3"}`}>{product.description}</p>
                    
                    <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.965c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.05 9.392c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69L9.049 2.927z" />
                                </svg>
                            ))}
                        </div>
                        {reviewCount > 0 ? (
                            <span className="text-gray-500 ml-2 text-xs">({reviewCount} রিভিউ)</span>
                        ) : (
                            <span className="text-gray-500 ml-2 text-xs">(কোনো রিভিউ নেই)</span>
                        )}
                    </div>

                    <div className="mt-auto">
                        <div className="flex justify-between items-center mb-4">
                            {product.discount > 0 ? (
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-gray-500 line-through">৳{product.price}</span>
                                    <span className="text-2xl font-bold text-green-700">৳{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-2xl font-bold text-green-700">৳{product.price}</span>
                            )}
                            <select id={`quantity-${product._id}`} className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-green-400 text-gray-700" onClick={(e) => e.stopPropagation()}>
                                <option value="1">১</option>
                                <option value="2">২</option>
                                <option value="3">৩</option>
                            </select>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(product._id, parseInt(document.getElementById(`quantity-${product._id}`).value)); }} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4CAF50_0%,#98FF98_50%,#F5F5F5_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl">
                                কার্টে যোগ করুন
                            </span>
                        </button>
                    </div>
                </div>
                {product.recipe && (
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">তৈরির প্রক্রিয়া</h2>
                        <p className={isExpanded ? "block" : "line-clamp-3"}>
                            {product.recipe}
                        </p>
                        <button onClick={toggleExpand} className="text-blue-500 mt-2">
                            {isExpanded ? "সংকুচিত করুন" : "বিস্তারিত"}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const ProductDetail = ({ product, onBack, reviews, submitReview, addToCart }) => {
        const productReviews = reviews[product._id] || [];
        const averageRating = productReviews.length > 0
            ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
            : 'N/A';

        const [isExpanded, setIsExpanded] = useState(false);

        const toggleExpand = () => {
            setIsExpanded(!isExpanded);
        };

        return (
            <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
                <button onClick={onBack} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4CAF50_0%,#98FF98_50%,#F5F5F5_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl">
                        &larr; সব খিচুড়ি দেখুন
                    </span>
                </button>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <img src={product.image} alt={product.name} className="rounded-lg shadow-xl w-full h-auto object-cover" />
                        {product.discount > 0 && (
                            <span className="mt-4 inline-block bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-full shadow-md">
                                {product.discount}% ডিসকাউন্ট
                            </span>
                        )}
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className={`text-gray-600 text-xl mb-4 ${isExpanded ? "block" : "line-clamp-3"}`}>{product.description}</p>

                        <div className="flex items-center mb-4">
                            {product.discount > 0 ? (
                                <div className="flex flex-col mr-4">
                                    <span className="text-lg font-bold text-gray-500 line-through">৳{product.price}</span>
                                    <span className="text-4xl font-bold text-green-700">৳{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-4xl font-bold text-green-700 mr-4">৳{product.price}</span>
                            )}
                            <select id={`quantity-${product._id}-detail`} className="rounded-md border border-gray-300 p-3 text-lg focus:ring-2 focus:ring-green-400 text-gray-700">
                                <option value="1">১</option>
                                <option value="2">২</option>
                                <option value="3">৩</option>
                            </select>
                        </div>
                        <button onClick={() => addToCart(product._id, parseInt(document.getElementById(`quantity-${product._id}-detail`).value))} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4CAF50_0%,#98FF98_50%,#F5F5F5_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl">
                                কার্টে যোগ করুন
                            </span>
                        </button>
                    </div>
                </div>

                {/* Recipe Section */}
                {product.recipe && (
                    <div className="mt-12 border-t pt-8 border-gray-200">
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">তৈরির প্রক্রিয়া</h3>
                        <div className="bg-green-50 p-6 rounded-lg shadow-inner">
                            <p className={isExpanded ? "block" : "hidden"}>
                                {product.recipe}
                            </p>
                            <button onClick={toggleExpand} className="text-blue-500 mt-2">
                                {isExpanded ? "সংকুচিত করুন" : "বিস্তারিত"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Reviews Section */}
                <div className="mt-12 border-t pt-8 border-gray-200">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">কাস্টমার রিভিউ ({productReviews.length}টি)</h3>
                    <div className="flex items-center mb-6">
                        <span className="text-2xl font-bold text-yellow-500 mr-2">{averageRating}</span>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.965c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.05 9.392c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69L9.049 2.927z" />
                                </svg>
                            ))}
                        </div>
                        {productReviews.length > 0 && <span className="text-gray-600 ml-3">({productReviews.length} জন রেটিং দিয়েছেন)</span>}
                    </div>

                    <div className="space-y-6">
                        {productReviews.length > 0 ? (
                            productReviews.map((review, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-300">
                                    <div className="flex items-center mb-3">
                                        <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold mr-4">
                                            {review.author.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg text-gray-900">{review.author}</p>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.965c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.05 9.392c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69L9.049 2.927z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-2">{review.comment}</p>
                                    <span className="text-gray-500 text-sm">{review.timestamp}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 px-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-600 text-lg">এই প্রোডাক্টের জন্য এখনো কোনো রিভিউ নেই।</p>
                                <p className="text-gray-500 mt-2">আপনি প্রথম রিভিউটি করতে পারেন!</p>
                            </div>
                        )}
                    </div>

                    {/* Submit Review Form */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">একটি রিভিউ লিখুন</h3>
                        <form onSubmit={(e) => { 
                            e.preventDefault(); 
                            submitReview(product._id, reviewForm); 
                            setReviewForm({ rating: 0, comment: '', author: '' }); 
                        }}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">আপনার রেটিং:</label>
                                <div className="flex text-green-500 text-xl cursor-pointer">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <i key={star}
                                           className={`fas fa-star mr-1 ${star <= reviewForm.rating ? '' : 'text-gray-300'}`}
                                           onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}></i>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="review-comment" className="block text-gray-700 text-sm font-bold mb-2">
                                    আপনার মন্তব্য:
                                </label>
                                <textarea
                                    id="review-comment"
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                                    value={reviewForm.comment}
                                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="reviewer-name" className="block text-gray-700 text-sm font-bold mb-2">
                                    আপনার নাম:
                                </label>
                                <input
                                    type="text"
                                    id="reviewer-name"
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                                    value={reviewForm.author}
                                    onChange={(e) => setReviewForm(prev => ({ ...prev, author: e.target.value }))}
                                    required
                                />
                            </div>
                            <button type="submit" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4CAF50_0%,#98FF98_50%,#F5F5F5_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl">
                                    রিভিউ জমা দিন
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        );
    };

    const CartModal = ({ isOpen, onClose, cartItems, onRemove, onOrderSubmit, totalAmount }) => {
        const [customerName, setCustomerName] = useState('');
        const [address, setAddress] = useState('');
        const [phone, setPhone] = useState('');
        const [email, setEmail] = useState('');
        const [paymentOption, setPaymentOption] = useState('ক্যাশ অন ডেলিভারি');
        const [showConfirmation, setShowConfirmation] = useState(false);
        const [showOrderError, setShowOrderError] = useState(false);

        useEffect(() => {
            if (!isOpen) {
                // Reset form when modal closes
                setCustomerName('');
                setEmail('');
                setAddress('');
                setPhone('');
                setPaymentOption('ক্যাশ অন ডেলিভারি');
                setShowConfirmation(false);
                setShowOrderError(false);
            }
        }, [isOpen]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (cartItems.length === 0) {
                alert('অর্ডার করার জন্য কার্টে কোনো আইটেম নেই।'); // Use custom modal for this
                return;
            }
            const orderData = {
                customerName,
                email,
                address,
                phone,
                items: cartItems.map(item => ({
                    productId: item._id, // Use _id from product object
                    name: item.name,
                    qty: item.quantity,
                    price: item.price,
                    discount: item.discount || 0
                })),
                total: totalAmount,
                paymentMethod: paymentOption,
                status: 'পেন্ডিং',
            };
            try {
                await onOrderSubmit(orderData); // Call the parent's order submit function
                setShowConfirmation(true);
            } catch (err) {
                setShowOrderError(true);
                console.error("CartModal order submission error:", err);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-bold text-gray-800">আপনার কার্ট</h2>
                        <button onClick={onClose} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            <i className="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                    <div className="mb-6 border-b border-gray-200 pb-4">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-600 text-lg">আপনার কার্ট খালি।</p>
                        ) : (
                            cartItems.map(item => (
                                <div key={item._id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg mr-4 object-cover" />
                                        <div>
                                            <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-gray-600">৳{item.price} x {item.quantity}</p>
                                            {item.discount > 0 && <span className="text-sm text-red-500">({item.discount}% ডিসকাউন্ট)</span>}
                                            <p className="text-green-700 font-bold">মোট: ৳{(item.price * (1 - item.discount / 100) * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemove(item._id)} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4CAF50_0%,#98FF98_50%,#F5F5F5_100%)]" />
                                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl">
                                            <i className="fas fa-trash-alt text-lg"></i>
                                        </span>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold text-gray-800 mb-6">
                        <span>মোট দাম:</span>
                        <span>৳{totalAmount}</span>
                    </div>
                    {showConfirmation ? (
                        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
                            <p className="font-bold text-lg mb-2">আপনার অর্ডার সফল হয়েছে!</p>
                            <p>আমরা আপনার অর্ডার পেয়েছি এবং দ্রুতই আপনার সাথে যোগাযোগ করব।</p>
                            <button onClick={onClose} className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-300 border-2 border-green-600 text-green-600 hover:text-white animate-border-spin">
                                বন্ধ করুন
                            </button>
                        </div>
                    ) : showOrderError ? (
                        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg shadow-md">
                            <p className="font-bold text-lg mb-2">অর্ডার দিতে সমস্যা হয়েছে!</p>
                            <p>দয়া করে আবার চেষ্টা করুন।</p>
                            <button onClick={() => setShowOrderError(false)} className="mt-4 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition duration-300 border-2 border-red-500 text-red-500 hover:text-white animate-border-spin">
                                বন্ধ করুন
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">অর্ডার তথ্য</h3>
                            <div className="mb-4">
                                <label htmlFor="order-name" className="block text-gray-700 text-sm font-bold mb-2">আপনার নাম:</label>
                                <input type="text" id="order-name" className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="আপনার পুরো নাম" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="order-email" className="block text-gray-700 text-sm font-bold mb-2">আপনার ইমেইল:</label>
                                <input type="email" id="order-email" className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="আপনার ইমেইল ঠিকানা" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="order-address" className="block text-gray-700 text-sm font-bold mb-2">ডেলিভারি ঠিকানা:</label>
                                <textarea id="order-address" rows="3" className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="ডেলিভারির জন্য বিস্তারিত ঠিকানা" required></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="order-phone" className="block text-gray-700 text-sm font-bold mb-2">মোবাইল নম্বর:</label>
                                <input type="tel" id="order-phone" className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="আপনার মোবাইল নম্বর" required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">পেমেন্ট অপশন:</label>
                                <div className="flex flex-col">
                                    <label className="inline-flex items-center mb-2">
                                        <input type="radio" name="payment-option" value="ক্যাশ অন ডেলিভারি" checked={paymentOption === 'ক্যাশ অন ডেলিভারি'} onChange={(e) => setPaymentOption(e.target.value)} className="form-radio h-5 w-5 text-green-600" />
                                        <span className="ml-2 text-gray-700">ক্যাশ অন ডেলিভারি</span>
                                    </label>
                                    <label className="inline-flex items-center mb-2">
                                        <input type="radio" name="payment-option" value="বিকাশ" checked={paymentOption === 'বিকাশ'} onChange={(e) => setPaymentOption(e.target.value)} className="form-radio h-5 w-5 text-green-600" />
                                        <span className="ml-2 text-gray-700">বিকাশ</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input type="radio" name="payment-option" value="নগদ" checked={paymentOption === 'নগদ'} onChange={(e) => setPaymentOption(e.target.value)} className="form-radio h-5 w-5 text-green-600" />
                                        <span className="ml-2 text-gray-700">নগদ</span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4CAF50_0%,#98FF98_50%,#F5F5F5_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl">
                                    অর্ডার নিশ্চিত করুন
                                </span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        );
    };

    const notificationColors = {
        info: 'bg-blue-600',
        success: 'bg-green-600',
        error: 'bg-red-600',
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50" style={{ fontFamily: 'Noto Sans Bengali, sans-serif' }}>
            <Header />

            <main className="container mx-auto px-4 py-8 flex-grow">
                {currentView === 'home' && (
                    <>
                        {/* Hero Section */}
                        <section id="home" className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-2xl p-8 mb-12 transform transition duration-500 hover:scale-[1.01]">
                            <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
                                <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-4 animate-fadeIn">
                                    <span className="text-green-600">সুস্বাদু খিচুড়ি</span><br />
                                    ঘরের মতো স্বাদ!
                                </h1>
                                <p className="text-xl text-gray-700 mb-8 animate-slideInFromLeft">আমাদের ঐতিহ্যবাহী রেসিপিতে তৈরি টাটকা এবং পুষ্টিকর খিচুড়ি উপভোগ করুন।</p>
                                <a href="#products" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4CAF50_0%,#98FF98_50%,#F5F5F5_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl">
                                        এখনই অর্ডার করুন <i className="fas fa-arrow-right ml-2"></i>
                                    </span>
                                </a>
                            </div>
                            <div className="md:w-1/2 flex justify-center items-center">
                                <img src="https://placehold.co/600x400/FFD700/6B8E23?text=Delicious+Khichuri" alt="আকর্ষণীয় খিচুড়ির ছবি" className="rounded-2xl shadow-3xl w-full h-auto object-cover border-4 border-green-500 animate-zoomIn" />
                            </div>
                        </section>

                        <div className="my-12 border-t-2 border-gray-200"></div> {/* Divider */}

                        {/* Products Section */}
                        <section id="products" className="py-8">
                            <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-12 animate-fadeInDown">আমাদের বিভিন্ন ধরণের খিচুড়ি</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                                {products.length === 0 && (
                                    <p className="text-center text-gray-600 text-lg col-span-full">কোনো খিচুড়ি পাওয়া যায়নি।</p>
                                )}
                            </div>
                        </section>

                        {/* Contact Section - Moved to Home view */}
                        <section id="contact-home" className="py-12 bg-white rounded-xl shadow-lg p-8 mb-12">
                            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">আমাদের সাথে যোগাযোগ করুন</h2>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/2 p-6 bg-gray-50 rounded-lg shadow-inner">
                                    <p className="text-lg text-gray-700 mb-4 font-semibold">আমাদের ঠিকানা:</p>
                                    <p className="text-md text-gray-600 mb-6">{"বেইলি ব্রিজ, পাঁচ্চর, শিবচর, মাদারীপুর ।"}</p> {/* আপনার ঠিকানা */}

                                    <p className="text-lg text-gray-700 mb-4 font-semibold">ফোন:</p>
                                    <p className="text-md text-gray-600 mb-6"><a href="tel:+8801648202601" className="text-green-700 hover:underline">০১৬৪৮২০২৬০১</a></p> {/* আপনার ফোন নম্বর */}

                                    <p className="text-lg text-gray-700 mb-4 font-semibold">ফেসবুক পেজ:</p>
                                    <p className="text-md text-gray-600 mb-6"><a href={"https://www.facebook.com/people/Nakirah/61576935029564/?mibextid=wwXIfr&rdid=5b6o4IzjjBV03Pny&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15gDQmmgrc%2F%3Fmibextid%3DwwXIfr"} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">facebook.com/Nakirah</a></p> {/* আপনার ফেসবুক লিংক */}

                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">আমাদের ম্যাপে খুঁজুন</h3>
                                    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md border-2 border-green-500">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.793740924905!2d90.07661507504364!3d23.71988897868352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b9b8b9b8b9%3A0x2a1b2c3d4e5f6a7b!2sBaiker%20Bridge%2C%20Pachchar%2C%20Shibchar%2C%20Madaripur!5e0!3m2!1sen!2sbd!4v1678912345678!5m2!1sen!2sbd"
                                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                                <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">মেসেজ পাঠান</h3>
                                    <form onSubmit={handleContactSubmit}> {/* Added onSubmit handler */}
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">আপনার নাম:</label>
                                            <input type="text" id="name" name="name" className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="আপনার নাম লিখুন" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">আপনার ইমেইল:</label>
                                            <input type="email" id="email" name="email" className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="আপনার ইমেইল লিখুন" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">আপনার মেসেজ:</label>
                                            <textarea id="message" name="message" rows="5" className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="এখানে আপনার মেসেজ লিখুন" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required></textarea>
                                        </div>
                                        <button type="submit" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4CAF50_0%,#98FF98_50%,#F5F5F5_100%)]" />
                                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl">
                                                মেসেজ পাঠান
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {currentView === 'productDetail' && selectedProduct && (
                    <ProductDetail 
                        product={selectedProduct} 
                        onBack={() => { setCurrentView('home'); setSelectedProduct(null); }} 
                        reviews={reviews}
                        submitReview={submitReview}
                        addToCart={addToCart}
                    />
                )}
            </main>

            <Footer />

            <CartModal
                isOpen={isCartModalOpen}
                onClose={() => setIsCartModalOpen(false)}
                cartItems={cart}
                onRemove={removeFromCart}
                onOrderSubmit={handleOrderSubmit}
                totalAmount={calculateCartTotal()}
            />

            {showNotification && (
                <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white z-[9999] ${notificationColors[notificationType] || 'bg-gray-800'}`}>
                    {notification}
                </div>
            )}
        </div>
    );
};

export default App;
