import React, { useRef, useEffect, useState } from 'react';
import MenuCard from '../components/MenuCard';
import { useNavigate } from 'react-router-dom';

const Menu = ({ products, addToCart, showBack = false }) => {
    const navigate = useNavigate();
    const listRef = useRef(null);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        if (!listRef.current) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.dataset.id);
                }
            });
        }, { root: listRef.current, threshold: 0.5 });
        const items = listRef.current.querySelectorAll('.snap-item');
        items.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
            <div className="container mx-auto px-6 py-12 relative">
                {showBack && (
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-6 top-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 z-10"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>ফিরে যান
                    </button>
                )}
                
                {/* Header Section */}
                <div className="text-center mb-16 pt-8">
                    <div className="inline-block">
                        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent mb-4">
                            আমাদের মেনু
                        </h1>
                        <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            স্বাদের অপূর্ব সমাহার - আমাদের বিশেষভাবে প্রস্তুতকৃত খিচুড়ির সংগ্রহ
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                <div ref={listRef} className="flex overflow-x-auto space-x-6 snap-x snap-mandatory scroll-smooth pb-4 md:space-x-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:gap-8 lg:gap-10">
                    {products.map((product) => (
                        <MenuCard key={product._id} product={product} addToCart={addToCart} active={activeId===product._id} />
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="text-center mt-16 py-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">আরও কিছু খুঁজছেন?</h3>
                        <p className="text-gray-600 mb-6">আমাদের সাথে যোগাযোগ করুন বিশেষ অর্ডারের জন্য</p>
                        <button 
                            onClick={() => {
                                // Navigate to home and scroll to contact section
                                navigate('/');
                                setTimeout(() => {
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) {
                                        const headerHeight = 100;
                                        const y = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                                        window.scrollTo({
                                            top: y,
                                            behavior: 'smooth'
                                        });
                                    }
                                }, 300);
                            }}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            যোগাযোগ করুন
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
