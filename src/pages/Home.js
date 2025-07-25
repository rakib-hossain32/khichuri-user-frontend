import React, { useRef, useEffect, useState } from 'react';
import Menu from './Menu';
import About from './About';
import Contact from './Contact';
import { Link } from 'react-router-dom';

const Home = ({ products, addToCart }) => {
    const featuredRef = useRef(null);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        if (!featuredRef.current) return;
        const options = { root: featuredRef.current, threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.dataset.id);
                }
            });
        }, options);
        const items = featuredRef.current.querySelectorAll('.snap-item');
        items.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="relative rounded-lg p-12 mb-12 text-center bg-green-900 bg-opacity-60 bg-blend-multiply bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80')"}}>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 drop-shadow">স্বাগতম খিচুড়ি ঘরে</h2>
                <p className="text-xl text-gray-100 mb-6 drop-shadow">বাড়ির মতো স্বাদের খিচুড়ি এখন আপনার দরজায়</p>
                <Link 
                    to="/menu" 
                    className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                    অর্ডার করুন
                </Link>
            </div>
            
            {/* Featured Products */}
            <div className="mb-12">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6 inline-block border-b-4 border-green-600 pb-1">আমাদের জনপ্রিয় আইটেম</h2>
                <div ref={featuredRef} className="flex overflow-x-auto space-x-4 md:space-x-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 snap-x snap-mandatory scroll-smooth">
                    {products.slice(0, 3).map((product) => (
                        <div key={product._id} data-id={product._id} className={`snap-item relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 w-80 flex-shrink-0 snap-center md:w-auto transform hover:-translate-y-2 hover:scale-105 border border-gray-100 ${activeId===product._id ? 'scale-100' : 'scale-95 opacity-80'}`}>
                            {product.discount > 0 && (
                                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg z-10">
                                    <span className="drop-shadow-sm">{product.discount}% ছাড়</span>
                                </div>
                            )}
                            <Link to={`/product/${product._id}`} state={{ product }} className="block">
                                <img 
                                src={product.image || 'https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri'} 
                                alt={product.name} 
                                className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri';
                                }}
                            />
                            </Link>
                            <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">{product.name}</h3>
                                <p className="text-gray-600 mb-5 text-sm leading-relaxed line-clamp-2">{product.description.substring(0, 100)}...</p>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    {product.discount > 0 ? (
                                        <div>
                                            <span className="text-lg font-semibold text-gray-400 line-through">৳{product.price}</span>
                                            <span className="text-2xl font-bold text-green-600 ml-2">৳{(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                                        </div>
                                    ) : (
                                        <span className="text-2xl font-bold text-green-600">৳{product.price}</span>
                                    )}
                                    <button 
                                        onClick={() => addToCart(product._id, 1)}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        অর্ডার করুন
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Full Menu Section */}
            <section id="menu">
                <Menu products={products} addToCart={addToCart} />
            </section>

            {/* About Section */}
            <section id="about">
                <About />
            </section>

            {/* Contact Section */}
            <section id="contact">
                <Contact />
            </section>
        </div>
    );
};

export default Home;
