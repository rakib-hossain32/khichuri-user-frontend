import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartModal = ({ isOpen, onClose, cart, removeFromCart, updateQuantity, calculateCartTotal }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-modern z-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Modern Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                ></motion.div>

                {/* Modern Modal Content */}
                <motion.div
                    className="bg-white/95 backdrop-blur-xl w-full max-w-md h-full overflow-hidden shadow-2xl border border-white/20 relative"
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Modern Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-pattern opacity-10"></div>
                        <div className="relative z-10 flex justify-between items-center">
                            <motion.h2
                                className="text-2xl font-bold"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <i className="fas fa-shopping-cart mr-3"></i>
                                আপনার কার্ট
                            </motion.h2>
                            <motion.button
                                onClick={onClose}
                                className="text-white hover:text-gray-200 transition-colors duration-300 bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/30"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <i className="fas fa-times text-xl"></i>
                            </motion.button>
                        </div>
                    </div>

                    {/* Modern Content */}
                    <div className="p-6 h-full flex flex-col">
                        {cart.length === 0 ? (
                            <motion.div
                                className="text-center py-12 flex-1 flex flex-col items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="bg-gray-100 rounded-full p-8 mb-6">
                                    <i className="fas fa-shopping-cart text-6xl text-gray-300"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">আপনার কার্ট খালি</h3>
                                <p className="text-gray-600 mb-8">কিছু সুস্বাদু খিচুড়ি যোগ করুন</p>
                                <motion.button
                                    onClick={onClose}
                                    className="btn-modern bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <i className="fas fa-utensils mr-2"></i>
                                    শপিং চালিয়ে যান
                                </motion.button>
                            </motion.div>
                        ) : (
                            <>
                                {/* Modern Cart Items */}
                                <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                                    <AnimatePresence>
                                        {cart.map((item, index) => (
                                            <motion.div
                                                key={item._id}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 group"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    {/* Modern Image */}
                                                    <div className="relative">
                                                        <img
                                                            src={item.image || 'https://placehold.co/100x100/6B8E23/FFFFFF?text=Khichuri'}
                                                            alt={item.name}
                                                            className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                        {item.discount > 0 && (
                                                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                                {item.discount}%
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Modern Item Details */}
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-green-600 transition-colors duration-300">
                                                            {item.name}
                                                        </h3>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-green-600 font-bold text-lg">
                                                                ৳{(item.price * (1 - (item.discount || 0) / 100) * item.quantity).toFixed(2)}
                                                            </span>
                                                            {item.discount > 0 && (
                                                                <span className="text-sm text-gray-500 line-through">
                                                                    ৳{(item.price * item.quantity).toFixed(2)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Modern Quantity Controls */}
                                                    <div className="flex items-center space-x-2">
                                                        <motion.button
                                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                                                            disabled={item.quantity <= 1}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <i className="fas fa-minus text-sm"></i>
                                                        </motion.button>
                                                        <span className="w-10 text-center font-semibold text-gray-700">{item.quantity}</span>
                                                        <motion.button
                                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-green-100 hover:bg-green-200 rounded-lg transition-colors duration-300"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <i className="fas fa-plus text-sm text-green-600"></i>
                                                        </motion.button>
                                                        <motion.button
                                                            onClick={() => removeFromCart(item._id)}
                                                            className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-300"
                                                            whileHover={{ scale: 1.2, rotate: 15 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Modern Footer */}
                                <motion.div
                                    className="border-t border-gray-200 pt-6 bg-white/50 backdrop-blur-sm rounded-2xl p-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="flex justify-between items-center text-xl font-bold mb-6">
                                        <span className="text-gray-700">মোট</span>
                                        <span className="text-gradient text-2xl">৳{calculateCartTotal()}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <motion.button
                                            className="w-full btn-modern bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                            onClick={() => {
                                                navigate('/checkout');
                                                onClose();
                                            }}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <i className="fas fa-credit-card mr-2"></i>
                                            চেকআউট করুন
                                        </motion.button>
                                        <motion.button
                                            onClick={onClose}
                                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-2xl transition-all duration-300"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <i className="fas fa-arrow-left mr-2"></i>
                                            শপিং চালিয়ে যান
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CartModal;
