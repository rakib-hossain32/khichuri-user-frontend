import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
    return (
        <motion.div
            whileHover={{ y: -15, scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.6,
                ease: "easeOut"
            }}
            className="menu-card-modern group relative rounded-3xl shadow-modern hover:shadow-glow overflow-hidden transition-all duration-500 w-full transform hover-lift border border-gray-100/20 bg-white/95 backdrop-blur-sm"
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            {/* Modern Discount Badge */}
            {product.discount > 0 && (
                <motion.div
                    className="absolute top-4 left-4 z-30"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 animate-pulse-glow">
                        <span className="drop-shadow-md flex items-center">
                            <i className="fas fa-tag mr-1"></i>
                            {product.discount}% ছাড়
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Modern New Badge */}
            {product.discount === 0 && (
                <motion.div
                    className="absolute top-4 left-4 z-30"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 animate-float">
                        <span className="drop-shadow-md flex items-center">
                            <i className="fas fa-star mr-1"></i>
                            নতুন
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Modern Image Container */}
            <Link
                to={`/product/${product._id}`}
                state={{ product }}
                className="block relative overflow-hidden group"
            >
                <div className="relative overflow-hidden">
                    <img
                        src={
                            product.image ||
                            "https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri"
                        }
                        alt={product.name}
                        className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 img-modern"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri";
                        }}
                    />

                    {/* Modern Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Modern View Details Badge */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                    >
                        <div className="bg-white/95 backdrop-blur-sm text-green-700 font-semibold px-6 py-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-green-200/50">
                            <i className="fas fa-eye mr-2"></i>
                            বিস্তারিত দেখুন
                        </div>
                    </motion.div>
                </div>
            </Link>

            {/* Modern Content Container */}
            <div className="p-6 bg-gradient-to-b from-white via-white to-gray-50/80 relative">
                {/* Modern Title */}
                <motion.h3
                    className="text-2xl font-bold text-gray-800 mb-3 leading-tight hover:text-green-700 transition-colors duration-300 group-hover:text-green-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {product.name}
                </motion.h3>

                {/* Modern Rating Display */}
                {product.rating && (
                    <motion.div
                        className="flex items-center mb-3"
                        aria-label={`রেটিং ${product.rating} স্টার`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <i
                                    key={i}
                                    className={`fas fa-star ${i <= Math.round(product.rating)
                                        ? "text-yellow-500"
                                        : "text-gray-200"
                                        } text-lg transition-colors duration-300 hover:scale-110`}
                                ></i>
                            ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            ({product.rating.toFixed(1)})
                        </span>
                    </motion.div>
                )}

                {/* Modern Description */}
                <motion.p
                    className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-2 font-medium group-hover:text-gray-700 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    {product.description}
                </motion.p>

                {/* Modern Price and Action Section */}
                <motion.div
                    className="flex justify-between items-center pt-4 border-t border-gray-100/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    {/* Modern Price Display */}
                    <div className="flex flex-col">
                        {product.discount > 0 ? (
                            <>
                                <span className="text-base font-medium text-gray-400 line-through">
                                    ৳{product.price}
                                </span>
                                <span className="text-2xl font-extrabold text-gradient mt-0.5">
                                    ৳{(product.price * (1 - product.discount / 100)).toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl font-extrabold text-gradient">
                                ৳{product.price}
                            </span>
                        )}
                    </div>

                    {/* Modern Add to Cart Button */}
                    <motion.button
                        onClick={() => addToCart(product._id, 1)}
                        className="btn-modern bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus-modern"
                        aria-label={`Add ${product.name} to cart`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <i className="fas fa-plus mr-2"></i>
                        অর্ডার করুন
                    </motion.button>
                </motion.div>

                {/* Modern Hover Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Modern Corner Decorations */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-green-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Modern Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>

            {/* Modern Border Animation */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500 via-green-600 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
        </motion.div>
    );
};

export default ProductCard;
