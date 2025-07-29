import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MenuCard from "../components/MenuCard";
import "../styles/menu.css";

const Menu = ({ products, addToCart, showBack = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const listRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Check if we're on the actual Menu page (not as a section in Home)
  const isMenuPage = location.pathname === '/menu';

  useEffect(() => {
    setIsVisible(true);
    if (!listRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.dataset.id);
          }
        });
      },
      { root: listRef.current, threshold: 0.5 }
    );

    const items = listRef.current.querySelectorAll(".snap-item");
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 relative overflow-hidden z-content">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 bg-gradient-pattern opacity-5 pointer-events-none"></div>

      {/* Modern Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-green-100/40 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tl from-green-100/40 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 bg-gradient-to-r from-green-100/30 to-transparent rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"></div>

      {/* Modern Header Section */}
      <motion.div
        className="text-center mb-12 sm:mb-20 pt-4 sm:pt-8 relative z-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Modern Back Button - Only show on actual Menu page */}
        {isMenuPage && (
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            onClick={() => navigate(-1)}
            className="absolute top-4 left-1 sm:top-6 md:left-[100px] xl:left-[200px] z-50 bg-white/90 backdrop-blur-md border border-green-200/50 text-green-700 font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            aria-label="Go back"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-arrow-left mr-1 sm:mr-2"></i>
            <span className="hidden sm:inline">ফিরে যান</span>
            <span className="sm:hidden">ফিরে</span>
          </motion.button>
        )}

        {/* Modern Section Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-green-50/30 rounded-3xl -m-4 sm:-m-8"></div>

        {/* Modern Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>

        <div className="relative z-10 p-4 sm:p-8">
          <div className="inline-block relative group">
            {/* Enhanced Background Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:duration-300 animate-tilt"></div>

            {/* Modern Content Container */}
            <div className="menu-header-modern relative">
              {/* Title with Enhanced Styling */}
              <div className="relative">
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 tracking-tight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="text-gradient bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
                    আমাদের মেনু
                  </span>
                </motion.h1>

                {/* Enhanced Decorative Lines */}
                <div className="relative my-4 sm:my-6">
                  <motion.div
                    className="h-1 sm:h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-full mx-auto w-24 sm:w-40 transform transition-all duration-500 group-hover:scale-x-125"
                    initial={{ width: 0 }}
                    animate={{ width: "6rem" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                  <motion.div
                    className="h-0.5 sm:h-1 bg-gradient-to-r from-green-300 via-green-400 to-green-300 rounded-full mx-auto w-12 sm:w-20 mt-2 sm:mt-3 transform transition-all duration-500 group-hover:scale-x-150"
                    initial={{ width: 0 }}
                    animate={{ width: "3rem" }}
                    transition={{ duration: 1, delay: 0.7 }}
                  ></motion.div>
                </div>

                {/* Enhanced Subtitle */}
                <motion.p
                  className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-medium mt-4 sm:mt-6 group-hover:text-gray-800 transition-colors duration-300 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  স্বাদের অপূর্ব সমাহার - আমাদের বিশেষভাবে প্রস্তুতকৃত খিচুড়ির
                  সংগ্রহ যা আপনার স্বাদ কুঁড়িকে জাগিয়ে তুলবে
                </motion.p>
              </div>

              {/* Modern Decorative Icons */}
              <motion.div
                className="flex justify-center space-x-3 sm:space-x-4 mt-6 sm:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse-glow">
                  <i className="fas fa-utensils text-green-600 text-xs sm:text-sm"></i>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500/20 rounded-full flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                  <i className="fas fa-star text-yellow-600 text-xs sm:text-sm"></i>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '1s' }}>
                  <i className="fas fa-heart text-red-600 text-xs sm:text-sm"></i>
                </div>
              </motion.div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-green-400 rounded-full blur opacity-60 animate-pulse-glow"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-green-400 rounded-full blur opacity-60 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-green-300 rounded-full blur opacity-40 animate-float"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-green-300 rounded-full blur opacity-40 animate-float" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-content">
        {/* Modern Products Grid */}
        <motion.div
          className="relative z-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            ref={listRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  data-id={product._id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * index,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  onHoverStart={() => setHoveredProduct(product._id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  className="snap-item group relative"
                >
                  <MenuCard
                    product={product}
                    addToCart={addToCart}
                    active={activeId === product._id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Modern Bottom Section */}
        <motion.div
          className="text-center mt-12 sm:mt-20 py-6 sm:py-8 relative z-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Modern Section Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-green-50/30 rounded-3xl -m-4 sm:-m-8"></div>

          {/* Modern Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>

          <div className="relative z-10 p-4 sm:p-8">
            <div className="bottom-section-modern max-w-2xl sm:max-w-3xl mx-auto">
              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <span className="text-gradient bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  আরও কিছু খুঁজছেন?
                </span>
              </motion.h3>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                আমাদের সাথে যোগাযোগ করুন বিশেষ অর্ডারের জন্য এবং আপনার স্বাদ অনুযায়ী কাস্টমাইজড খিচুড়ি পেতে
              </motion.p>
              <motion.button
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      const headerHeight = 100;
                      const y = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                      window.scrollTo({
                        top: y,
                        behavior: "smooth",
                      });
                    }
                  }, 300);
                }}
                className="btn-menu-modern text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <i className="fas fa-phone-alt mr-2 sm:mr-3"></i>
                যোগাযোগ করুন
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modern Floating Elements */}
      <div className="fixed top-20 right-10 w-20 h-20 bg-green-100/20 rounded-full blur-xl animate-float pointer-events-none z-floating"></div>
      <div className="fixed bottom-20 left-10 w-16 h-16 bg-green-200/20 rounded-full blur-lg animate-float pointer-events-none z-floating" style={{ animationDelay: '2s' }}></div>
      <div className="fixed top-1/2 right-1/4 w-12 h-12 bg-green-300/20 rounded-full blur-md animate-pulse-glow pointer-events-none z-floating"></div>
    </div>
  );
};

export default Menu;
