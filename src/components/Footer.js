import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="relative p-8 mt-16 text-center text-white shadow-2xl footer-modern bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-t-3xl z-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Modern Background Pattern */}
            <div className="absolute inset-0 bg-gradient-pattern opacity-5 rounded-t-3xl"></div>

            {/* Modern Decorative Elements */}
            <div className="absolute top-0 w-32 h-1 left-1/4 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
            <div className="absolute top-0 w-32 h-1 right-1/4 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>

            <div className="container relative z-10 mx-auto">
                {/* Modern Logo Section */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex items-center justify-center mb-4 space-x-3">
                        <img
                            src={`${process.env.PUBLIC_URL}/logo.png`}
                            alt="খিচুড়ি ঘর Logo"
                            className="w-auto h-12 opacity-80"
                        />
                        <span className="text-2xl font-extrabold text-gradient">খিচুড়ি ঘর</span>
                    </div>
                    <p className="max-w-2xl mx-auto text-lg text-gray-300">
                        বাড়ির মতো স্বাদের খিচুড়ি এখন আপনার দরজায় - স্বাদের অপূর্ব সমাহার
                    </p>
                </motion.div>

                {/* Modern Navigation Links */}
                <motion.div
                    className="flex flex-wrap justify-center mb-8 space-x-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {[
                        { to: "/sitemap", label: "সাইট ম্যাপ", icon: "fa-sitemap" },
                        { to: "/terms", label: "টার্মস", icon: "fa-file-contract" },
                        { to: "/privacy", label: "প্রাইভেসি পলিসি", icon: "fa-shield-alt" }
                    ].map((link, index) => (
                        <motion.div
                            key={link.to}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to={link.to}
                                className="flex items-center px-4 py-2 space-x-2 transition-all duration-300 border hover:text-green-400 group bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 border-gray-700/50 hover:border-green-500/50"
                            >
                                <i className={`fas ${link.icon} text-green-400 group-hover:text-green-300 transition-colors duration-300`}></i>
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Modern Contact Info */}
                <motion.div
                    className="grid grid-cols-1 gap-6 mb-8 text-gray-300 md:grid-cols-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="flex items-center justify-center space-x-3 group">
                        <div className="p-3 transition-colors duration-300 rounded-full bg-green-500/20 group-hover:bg-green-500/30">
                            <i className="text-xl text-green-400 fas fa-phone"></i>
                        </div>
                        <div>
                            <p className="font-semibold text-white">ফোন</p>
                            <p>+880 1234-567890</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-3 group">
                        <div className="p-3 transition-colors duration-300 rounded-full bg-green-500/20 group-hover:bg-green-500/30">
                            <i className="text-xl text-green-400 fas fa-envelope"></i>
                        </div>
                        <div>
                            <p className="font-semibold text-white">ইমেইল</p>
                            <p>khichurighorbd@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-3 group">
                        <div className="p-3 transition-colors duration-300 rounded-full bg-green-500/20 group-hover:bg-green-500/30">
                            <i className="text-xl text-green-400 fas fa-map-marker-alt"></i>
                        </div>
                        <div>
                            <p className="font-semibold text-white">ঠিকানা</p>
                            <p>শিবচর, মাদারীপুর, ঢাকা, বাংলাদেশ</p>
                        </div>
                    </div>
                </motion.div>

                {/* Modern Social Links */}
                <motion.div
                    className="flex justify-center mb-8 space-x-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    {[
                        { icon: "fa-facebook", color: "hover:text-blue-400", bg: "hover:bg-blue-500/20" },
                        { icon: "fa-twitter", color: "hover:text-blue-300", bg: "hover:bg-blue-500/20" },
                        { icon: "fa-instagram", color: "hover:text-pink-400", bg: "hover:bg-pink-500/20" },
                        { icon: "fa-youtube", color: "hover:text-red-400", bg: "hover:bg-red-500/20" }
                    ].map((social, index) => (
                        <motion.a
                            key={social.icon}
                            href="#"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 border border-gray-700/50 transition-all duration-300 ${social.color} ${social.bg} hover:border-gray-600/50`}
                        >
                            <i className={`fab ${social.icon} text-xl`}></i>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Modern Copyright */}
                <motion.div
                    className="pt-6 border-t border-gray-700/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <p className="text-gray-400">
                        &copy; {currentYear} <span className="font-semibold text-gradient">খিচুড়ি ঘর</span>। সর্বস্বত্ব সংরক্ষিত।
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        Made with <i className="mx-1 text-red-400 fas fa-heart"></i> in Bangladesh
                    </p>
                </motion.div>
            </div>

            {/* Modern Floating Elements */}
            <div className="absolute w-8 h-8 rounded-full top-4 left-10 bg-green-500/10 blur-md animate-float"></div>
            <div className="absolute w-6 h-6 rounded-full bottom-4 right-10 bg-green-400/10 blur-md animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute w-4 h-4 rounded-full top-1/2 left-1/3 bg-green-300/10 blur-sm animate-pulse-glow"></div>
        </motion.footer>
    );
};

export default Footer;
