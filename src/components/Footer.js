import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="footer-modern bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8 text-center rounded-t-3xl shadow-2xl mt-16 relative z-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Modern Background Pattern */}
            <div className="absolute inset-0 bg-gradient-pattern opacity-5 rounded-t-3xl"></div>

            {/* Modern Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
            <div className="absolute top-0 right-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>

            <div className="container mx-auto relative z-10">
                {/* Modern Logo Section */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <img
                            src={`${process.env.PUBLIC_URL}/logo.png`}
                            alt="খিচুড়ি ঘর Logo"
                            className="h-12 w-auto opacity-80"
                        />
                        <span className="text-2xl font-extrabold text-gradient">খিচুড়ি ঘর</span>
                    </div>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        বাড়ির মতো স্বাদের খিচুড়ি এখন আপনার দরজায় - স্বাদের অপূর্ব সমাহার
                    </p>
                </motion.div>

                {/* Modern Navigation Links */}
                <motion.div
                    className="flex flex-wrap justify-center space-x-8 mb-8"
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
                                className="flex items-center space-x-2 hover:text-green-400 transition-all duration-300 group bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2 hover:bg-gray-700/50 border border-gray-700/50 hover:border-green-500/50"
                            >
                                <i className={`fas ${link.icon} text-green-400 group-hover:text-green-300 transition-colors duration-300`}></i>
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Modern Contact Info */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="flex items-center justify-center space-x-3 group">
                        <div className="bg-green-500/20 rounded-full p-3 group-hover:bg-green-500/30 transition-colors duration-300">
                            <i className="fas fa-phone text-green-400 text-xl"></i>
                        </div>
                        <div>
                            <p className="font-semibold text-white">ফোন</p>
                            <p>+880 1234-567890</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-3 group">
                        <div className="bg-green-500/20 rounded-full p-3 group-hover:bg-green-500/30 transition-colors duration-300">
                            <i className="fas fa-envelope text-green-400 text-xl"></i>
                        </div>
                        <div>
                            <p className="font-semibold text-white">ইমেইল</p>
                            <p>info@khichurighor.com</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-3 group">
                        <div className="bg-green-500/20 rounded-full p-3 group-hover:bg-green-500/30 transition-colors duration-300">
                            <i className="fas fa-map-marker-alt text-green-400 text-xl"></i>
                        </div>
                        <div>
                            <p className="font-semibold text-white">ঠিকানা</p>
                            <p>ঢাকা, বাংলাদেশ</p>
                        </div>
                    </div>
                </motion.div>

                {/* Modern Social Links */}
                <motion.div
                    className="flex justify-center space-x-6 mb-8"
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
                    className="border-t border-gray-700/50 pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <p className="text-gray-400">
                        &copy; {currentYear} <span className="text-gradient font-semibold">খিচুড়ি ঘর</span>। সর্বস্বত্ব সংরক্ষিত।
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Made with <i className="fas fa-heart text-red-400 mx-1"></i> in Bangladesh
                    </p>
                </motion.div>
            </div>

            {/* Modern Floating Elements */}
            <div className="absolute top-4 left-10 w-8 h-8 bg-green-500/10 rounded-full blur-md animate-float"></div>
            <div className="absolute bottom-4 right-10 w-6 h-6 bg-green-400/10 rounded-full blur-md animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-green-300/10 rounded-full blur-sm animate-pulse-glow"></div>
        </motion.footer>
    );
};

export default Footer;
