import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";
import About from "./About";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import "../styles/menu.css";

const Home = ({ products, addToCart }) => {
  const featuredRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    if (!featuredRef.current) return;

    const options = { root: featuredRef.current, threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.dataset.id);
        }
      });
    }, options);

    const items = featuredRef.current.querySelectorAll(".snap-item");
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 relative z-content">
      {/* Modern Hero Section */}
      <motion.div
        className="hero-modern relative rounded-3xl p-12 mb-16 text-center bg-green-900 bg-opacity-60 bg-blend-multiply bg-cover bg-center overflow-hidden shadow-modern"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80')",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Modern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-green-800/60 to-green-700/50"></div>

        {/* Modern Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10">
          <motion.h2
            className="text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            স্বাগতম খিচুড়ি ঘরে
          </motion.h2>
          <motion.p
            className="text-2xl text-gray-100 mb-8 drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            বাড়ির মতো স্বাদের খিচুড়ি এখন আপনার দরজায়
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/menu"
              className="btn-modern inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-utensils mr-3"></i>
              অর্ডার করুন
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Featured Products Section */}
      <motion.div
        className="mb-20 relative z-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Modern Section Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-green-50/30 rounded-3xl"></div>

        {/* Modern Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>

        <div className="relative z-10 p-4">
          {/* Modern Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="inline-block relative">
              <motion.h2
                className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span className="text-gradient bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
                  আমাদের জনপ্রিয় আইটেম
                </span>
              </motion.h2>

              {/* Modern Underline Animation */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
              ></motion.div>
            </div>

            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              সর্বাধিক জনপ্রিয় এবং সুস্বাদু খিচুড়ি সংগ্রহ
            </motion.p>

            {/* Modern Decorative Icons */}
            <motion.div
              className="flex justify-center space-x-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse-glow">
                <i className="fas fa-star text-green-600 text-sm"></i>
              </div>
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                <i className="fas fa-heart text-yellow-600 text-sm"></i>
              </div>
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '1s' }}>
                <i className="fas fa-fire text-red-600 text-sm"></i>
              </div>
            </motion.div>
          </motion.div>

          {/* Modern Products Grid */}
          <motion.div
            ref={featuredRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <AnimatePresence>
              {products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product._id}
                  data-id={product._id}
                  className="snap-item group relative"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.4 + (index * 0.2),
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  onHoverStart={() => setHoveredProduct(product._id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                >
                  {/* Modern Card Container */}
                  <div className="menu-card-modern group relative rounded-3xl shadow-modern hover:shadow-glow overflow-hidden transition-all duration-500 w-full transform hover-lift border border-gray-100/20 bg-white/95 backdrop-blur-sm">

                    {/* Modern Discount Badge */}
                    {product.discount > 0 && (
                      <motion.div
                        className="absolute top-4 left-4 z-30"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + (index * 0.2) }}
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
                        transition={{ delay: 1.6 + (index * 0.2) }}
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
                        transition={{ delay: 1.8 + (index * 0.2) }}
                      >
                        {product.name}
                      </motion.h3>

                      {/* Modern Description */}
                      <motion.p
                        className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-2 font-medium group-hover:text-gray-700 transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.0 + (index * 0.2) }}
                      >
                        {product.description}
                      </motion.p>

                      {/* Modern Price and Action Section */}
                      <motion.div
                        className="flex justify-between items-center pt-4 border-t border-gray-100/80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2 + (index * 0.2) }}
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
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Modern View All Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <Link
              to="/menu"
              className="btn-modern inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <i className="fas fa-utensils mr-3"></i>
              সব আইটেম দেখুন
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Full Menu Section */}
      <section id="menu" className="relative z-content">
        <Menu products={products} addToCart={addToCart} />
      </section>

      {/* Modern About Section */}
      <section id="about" className="relative z-content">
        <About />
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="relative z-content">
        <Contact />
      </section>

      {/* Modern Floating Elements */}
      <div className="fixed top-20 right-10 w-20 h-20 bg-green-100/20 rounded-full blur-xl animate-float pointer-events-none z-floating"></div>
      <div className="fixed bottom-20 left-10 w-16 h-16 bg-green-200/20 rounded-full blur-lg animate-float pointer-events-none z-floating" style={{ animationDelay: '2s' }}></div>
      <div className="fixed top-1/2 right-1/4 w-12 h-12 bg-green-300/20 rounded-full blur-md animate-pulse-glow pointer-events-none z-floating"></div>
    </div>
  );
};

export default Home;
