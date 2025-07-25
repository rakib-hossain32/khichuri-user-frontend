import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = ({ cart, setIsCartModalOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        const executeScroll = () => {
            if (sectionId === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // If already on home, just scroll
        if (location.pathname === '/' || location.hash === '#/' || location.hash === '') {
            executeScroll();
        } else {
            // Navigate to home first then scroll after small delay
            navigate('/');
            setTimeout(executeScroll, 100);
        }
        setIsMenuOpen(false);
    }

    return (
        <header className="bg-gradient-to-r from-green-400 to-green-600 py-2 px-4 md:py-4 shadow-xl sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center flex-wrap">
                <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition duration-300">
                    {/* Replace \"/logo.png\" with the correct path if you store the image elsewhere */}
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="খিচুড়ি ঘর Logo" className="h-16 w-auto" />
                    {/* Optionally keep the text alongside the logo */}
                    <span className="hidden md:inline text-2xl font-extrabold text-gray-800 tracking-wide">খিচুড়ি ঘর</span>
                </Link>
                
                {/* Mobile Controls */}
                <div className="flex items-center space-x-4 md:hidden">
                    {/* Cart (mobile) */}
                    <button
                        onClick={() => setIsCartModalOpen(true)}
                        className="relative bg-white text-gray-800 hover:bg-green-500 hover:text-white focus:outline-none mr-4 rounded-full h-10 w-10 flex items-center justify-center shadow-md transition-colors duration-300"
                    >
                        <i className="fas fa-shopping-cart text-2xl"></i>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </button>
                    {/* Hamburger */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="text-gray-800 hover:text-white focus:outline-none md:hidden"
                    >
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                    </button>

                </div>

                {/* Menu Links */}
                <div className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'block' : 'hidden'} mt-4 md:mt-0`}>
                    <div className="flex flex-col md:flex-row md:space-x-8 text-gray-800 text-lg font-semibold items-center">
                        <button
                            className="block md:inline-block py-2 md:py-0 hover:text-white transition duration-300"
                            onClick={() => scrollToSection('top')}
                        >
                            হোম
                        </button>
                        <button
                            className="block md:inline-block py-2 md:py-0 hover:text-white transition duration-300"
                            onClick={() => scrollToSection('menu')}
                        >
                            মেনু
                        </button>
                        <button
                            className="block md:inline-block py-2 md:py-0 hover:text-white transition duration-300"
                            onClick={() => scrollToSection('about')}
                        >
                            আমাদের সম্পর্কে
                        </button>
                        <button
                            className="block md:inline-block py-2 md:py-0 hover:text-white transition duration-300"
                            onClick={() => scrollToSection('contact')}
                        >
                            যোগাযোগ
                        </button>
                        {/* Cart (desktop) */}
                        <button
                            onClick={() => setIsCartModalOpen(true)}
                            className="hidden md:inline-flex relative bg-white text-gray-800 hover:bg-green-500 hover:text-white focus:outline-none rounded-full h-10 w-10 items-center justify-center shadow-md transition-colors duration-300 ml-4"
                        >
                            <i className="fas fa-shopping-cart text-xl"></i>
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
