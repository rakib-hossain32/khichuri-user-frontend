import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartModal = ({
  isOpen,
  onClose,
  cart,
  removeFromCart,
  updateQuantity,
  calculateCartTotal,
}) => {
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
          className="relative w-full h-full max-w-md overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl border-white/20"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Modern Header */}
          <div className="relative p-6 overflow-hidden text-white bg-gradient-to-r from-green-500 to-green-600">
            <div className="absolute inset-0 bg-gradient-pattern opacity-10"></div>
            <div className="relative z-10 flex items-center justify-between">
              <motion.h2
                className="text-2xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <i className="mr-3 fas fa-shopping-cart"></i>
                আপনার কার্ড
              </motion.h2>
              <motion.button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 text-white transition-colors duration-300 rounded-full hover:text-gray-200 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="text-xl fas fa-times"></i>
              </motion.button>
            </div>
          </div>

          {/* Modern Content */}
          <div className="flex flex-col h-full p-6">
            {cart.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center flex-1 py-12 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="p-8 mb-6 bg-gray-100 rounded-full">
                  <i className="text-6xl text-gray-300 fas fa-shopping-cart"></i>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  আপনার কার্ড খালি
                </h3>
                <p className="mb-8 text-gray-600">
                  কিছু সুস্বাদু খিচুড়ি যোগ করুন
                </p>
                <motion.button
                  onClick={onClose}
                  className="px-8 py-3 font-bold text-white transition-all duration-300 btn-modern bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-2xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="mr-2 fas fa-utensils"></i>
                  শপিং চালিয়ে যান
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Modern Cart Items */}
                <div className="flex-1 mb-6 space-y-4 overflow-y-auto">
                  <AnimatePresence>
                    {cart.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl group"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Modern Image */}
                          <div className="relative">
                            <img
                              src={
                                item.image ||
                                "https://placehold.co/100x100/6B8E23/FFFFFF?text=Khichuri"
                              }
                              alt={item.name}
                              className="object-cover w-20 h-20 transition-transform duration-300 shadow-md rounded-xl group-hover:scale-105"
                            />
                            {item.discount > 0 && (
                              <div className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                                {item.discount}%
                              </div>
                            )}
                          </div>

                          {/* Modern Item Details */}
                          <div className="flex-1">
                            <h3 className="mb-1 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-green-600">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-green-600">
                                ৳
                                {(
                                  item.price *
                                  (1 - (item.discount || 0) / 100) *
                                  item.quantity
                                ).toFixed(2)}
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
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              }
                              className="flex items-center justify-center w-8 h-8 transition-colors duration-300 bg-gray-100 rounded-lg hover:bg-gray-200"
                              disabled={item.quantity <= 1}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <i className="text-sm fas fa-minus"></i>
                            </motion.button>
                            <span className="w-10 font-semibold text-center text-gray-700">
                              {item.quantity}
                            </span>
                            <motion.button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                              className="flex items-center justify-center w-8 h-8 transition-colors duration-300 bg-green-100 rounded-lg hover:bg-green-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <i className="text-sm text-green-600 fas fa-plus"></i>
                            </motion.button>
                            <motion.button
                              onClick={() => removeFromCart(item._id)}
                              className="ml-2 text-red-500 transition-colors duration-300 hover:text-red-700"
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
                  className="p-4 pt-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6 text-xl font-bold">
                    <span className="text-gray-700">মোট</span>
                    <span className="text-2xl text-gradient">
                      ৳{calculateCartTotal()}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <motion.button
                      className="w-full px-6 py-4 font-bold text-white transition-all duration-300 shadow-lg btn-modern bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl hover:shadow-xl"
                      onClick={() => {
                        navigate("/checkout");
                        onClose();
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="mr-2 fas fa-credit-card"></i>
                      চেকআউট করুন
                    </motion.button>
                    <motion.button
                      onClick={onClose}
                      className="w-full px-6 py-3 font-bold text-gray-800 transition-all duration-300 bg-gray-100 hover:bg-gray-200 rounded-2xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="mr-2 fas fa-arrow-left"></i>
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
