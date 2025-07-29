import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ cart, setIsCartModalOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <motion.header
            className={`nav-modern py-3 px-4 md:py-4 shadow-modern z-header transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl' : 'bg-gradient-to-r from-green-400/95 to-green-600/95 backdrop-blur-md'
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <nav className="container mx-auto flex justify-between items-center flex-wrap">
                {/* Modern Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition duration-300 group">
                        <div className="relative">
                            <img
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                alt="খিচুড়ি ঘর Logo"
                                className="h-16 w-auto transition-transform duration-300 group-hover:rotate-2"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <span className="hidden md:inline text-2xl font-extrabold text-gradient tracking-wide group-hover:text-green-700 transition-colors duration-300">
                            খিচুড়ি ঘর
                        </span>
                    </Link>
                </motion.div>

                {/* Modern Mobile Controls */}
                <div className="flex items-center space-x-4 md:hidden">
                    {/* Modern Cart Button (mobile) */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsCartModalOpen(true)}
                        className="relative bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-green-500 hover:text-white focus:outline-none mr-4 rounded-2xl h-12 w-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
                    >
                        <i className="fas fa-shopping-cart text-xl"></i>
                        <AnimatePresence>
                            {cart.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse-glow"
                                >
                                    {cart.length}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Modern Hamburger Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-800 hover:text-green-600 focus:outline-none md:hidden bg-white/90 backdrop-blur-sm rounded-2xl h-12 w-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
                    >
                        <motion.i
                            className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}
                            animate={{ rotate: isMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        ></motion.i>
                    </motion.button>
                </div>

                {/* Modern Menu Links */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full md:hidden mt-4 overflow-hidden"
                        >
                            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-6">
                                <div className="flex flex-col space-y-4 text-gray-800 text-lg font-semibold items-center">
                                    {[
                                        { id: 'top', label: 'হোম', icon: 'fa-home' },
                                        { id: 'menu', label: 'মেনু', icon: 'fa-utensils' },
                                        { id: 'about', label: 'আমাদের সম্পর্কে', icon: 'fa-info-circle' },
                                        { id: 'contact', label: 'যোগাযোগ', icon: 'fa-phone' }
                                    ].map((item) => (
                                        <motion.button
                                            key={item.id}
                                            whileHover={{ scale: 1.05, x: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full text-left py-3 px-4 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 flex items-center space-x-3"
                                            onClick={() => scrollToSection(item.id)}
                                        >
                                            <i className={`fas ${item.icon} text-green-500`}></i>
                                            <span>{item.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modern Desktop Menu */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                    <div className="flex items-center space-x-6 text-gray-800 text-lg font-semibold">
                        {[
                            { id: 'top', label: 'হোম', icon: 'fa-home' },
                            { id: 'menu', label: 'মেনু', icon: 'fa-utensils' },
                            { id: 'about', label: 'আমাদের সম্পর্কে', icon: 'fa-info-circle' },
                            { id: 'contact', label: 'যোগাযোগ', icon: 'fa-phone' }
                        ].map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center space-x-2 py-2 px-4 hover:text-white hover:bg-green-500/20 rounded-xl transition-all duration-300 group"
                                onClick={() => scrollToSection(item.id)}
                            >
                                <i className={`fas ${item.icon} text-green-500 group-hover:text-white transition-colors duration-300`}></i>
                                <span className="group-hover:text-white transition-colors duration-300">{item.label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Modern Cart Button (desktop) */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsCartModalOpen(true)}
                        className="relative bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-green-500 hover:text-white focus:outline-none rounded-2xl h-12 w-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 ml-4"
                    >
                        <i className="fas fa-shopping-cart text-xl"></i>
                        <AnimatePresence>
                            {cart.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse-glow"
                                >
                                    {cart.length}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </nav>

            {/* Modern Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-30"></div>
        </motion.header>
    );
};

export default Header;
