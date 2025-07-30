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

      {/* Premium Header Section */}
      <motion.div
        className="text-center mb-8 sm:mb-12 pt-2 sm:pt-4 relative z-content"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Premium Back Button - Only show on actual Menu page */}
        {isMenuPage && (
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            onClick={() => navigate(-1)}
            className="absolute top-2 left-1 sm:top-4 md:left-[80px] xl:left-[150px] z-50 bg-white/95 backdrop-blur-xl border border-green-200/60 text-green-700 font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-400 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            aria-label="Go back"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <i className="fas fa-arrow-left mr-1.5 sm:mr-2"></i>
            <span className="hidden sm:inline text-sm font-medium">ফিরে যান</span>
            <span className="sm:hidden text-xs font-medium">ফিরে</span>
          </motion.button>
        )}

        {/* Premium Section Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 via-white to-green-50/40 rounded-3xl -m-3 sm:-m-6"></div>

        {/* Premium Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/70 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/70 to-transparent"></div>

        <div className="relative z-10 p-3 sm:p-6">
          <div className="inline-block relative group">
            {/* Premium Background Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 via-green-500/30 to-green-600/30 rounded-2xl blur-xl opacity-15 group-hover:opacity-25 transition-all duration-700"></div>

            {/* Premium Content Container */}
            <div className="menu-header-premium relative bg-gradient-to-br from-white/95 via-white/90 to-green-50/30 backdrop-blur-xl rounded-2xl p-5 sm:p-7 shadow-2xl border border-green-100/60 hover:border-green-200/80 transition-all duration-500">
              {/* Premium Title */}
              <div className="relative">
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 tracking-tight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                >
                  <span className="text-gradient-premium bg-gradient-to-r from-green-700 via-green-600 to-green-800 bg-clip-text text-transparent drop-shadow-sm">
                    আমাদের মেনু
                  </span>
                </motion.h1>

                {/* Premium Decorative Line */}
                <div className="relative my-2 sm:my-3">
                  <motion.div
                    className="h-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-full mx-auto w-16 sm:w-20 transform transition-all duration-500 group-hover:scale-x-120"
                    initial={{ width: 0 }}
                    animate={{ width: "5rem" }}
                    transition={{ duration: 1, delay: 0.4 }}
                  ></motion.div>
                </div>

                {/* Premium Subtitle */}
                <motion.p
                  className="text-sm sm:text-base text-gray-700 max-w-lg sm:max-w-xl mx-auto leading-relaxed font-medium mt-3 sm:mt-4 group-hover:text-gray-800 transition-colors duration-500 px-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                  স্বাদের অপূর্ব সমাহার - আমাদের বিশেষভাবে প্রস্তুতকৃত খিচুড়ির
                  সংগ্রহ যা আপনার স্বাদ কুঁড়িকে জাগিয়ে তুলবে
                </motion.p>
              </div>

              {/* Premium Decorative Icons */}
              <motion.div
                className="flex justify-center space-x-3 sm:space-x-4 mt-4 sm:mt-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-green-500/30 to-green-600/40 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <i className="fas fa-utensils text-green-700 text-sm"></i>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-500/30 to-yellow-600/40 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <i className="fas fa-star text-yellow-700 text-sm"></i>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-red-500/30 to-red-600/40 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <i className="fas fa-heart text-red-700 text-sm"></i>
                </div>
              </motion.div>
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
    </div >
  );
};

export default Menu;
