import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";
import About from "./About";
import Contact from "./Contact";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import "../styles/menu.css";

const Home = ({ products, addToCart }) => {
  const featuredRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);

  // ডিসকাউন্ট আইটেমগুলো ফিল্টার করি
  const discountedProducts = products.filter((product) => product.discount > 0);

  // প্রথমে 3টি কার্ড দেখানোর জন্য
  const displayedOffers = showAllOffers ? discountedProducts : discountedProducts.slice(0, 3);

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
    <div className="container relative px-4 py-8 mx-auto z-content">
      {/* Modern Hero Section */}
      <motion.div
        className="relative p-12 mb-16 overflow-hidden text-center bg-green-900 bg-center bg-cover hero-modern rounded-3xl bg-opacity-60 bg-blend-multiply shadow-modern"
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
        <div className="absolute w-20 h-20 rounded-full top-10 left-10 bg-white/10 blur-xl animate-float"></div>
        <div
          className="absolute w-16 h-16 rounded-full bottom-10 right-10 bg-white/10 blur-lg animate-float"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10">
          <motion.h2
            className="mb-6 text-5xl font-extrabold text-white lg:text-6xl drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            স্বাগতম খিচুড়ি ঘরে
          </motion.h2>
          <motion.p
            className="mb-8 text-2xl text-gray-100 drop-shadow-md"
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
              className="inline-block px-8 py-4 font-bold text-white transition-all duration-300 shadow-lg btn-modern bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-2xl hover:shadow-xl"
            >
              <i className="mr-3 fas fa-utensils"></i>
              অর্ডার করুন
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Featured Products Section */}
      <motion.div
        className="relative mb-20 z-content"
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
            className="mb-16 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative inline-block">
              <motion.h2
                className="relative mb-6 text-4xl font-extrabold text-gray-900 lg:text-5xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span className="text-transparent text-gradient bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text">
                  আমাদের জনপ্রিয় আইটেম
                </span>
              </motion.h2>

              {/* Modern Underline Animation */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 rounded-full bg-gradient-to-r from-green-500 via-green-600 to-green-700"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
              ></motion.div>
            </div>

            <motion.p
              className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              সর্বাধিক জনপ্রিয় এবং সুস্বাদু খিচুড়ি সংগ্রহ
            </motion.p>

            {/* Modern Decorative Icons */}
            <motion.div
              className="flex justify-center mt-6 space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 animate-pulse-glow">
                <i className="text-sm text-green-600 fas fa-star"></i>
              </div>
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 animate-pulse-glow"
                style={{ animationDelay: "0.5s" }}
              >
                <i className="text-sm text-yellow-600 fas fa-heart"></i>
              </div>
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 animate-pulse-glow"
                style={{ animationDelay: "1s" }}
              >
                <i className="text-sm text-red-600 fas fa-fire"></i>
              </div>
            </motion.div>
          </motion.div>

          {/* জনপ্রিয় প্রোডাক্টস গ্রিড */}
          <motion.div
            ref={featuredRef}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <AnimatePresence>
              {products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product._id}
                  data-id={product._id}
                  className="relative snap-item group"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.4 + index * 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  onHoverStart={() => setHoveredProduct(product._id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                >
                  {/* Modern Card Container */}
                  <div className="relative w-full overflow-hidden transition-all duration-500 transform border menu-card-modern group rounded-3xl shadow-modern hover:shadow-glow hover-lift border-gray-100/20 bg-white/95 backdrop-blur-sm">
                    {/* Modern Discount Badge */}
                    {product.discount > 0 && (
                      <motion.div
                        className="absolute z-30 top-4 left-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + index * 0.2 }}
                      >
                        <div className="px-4 py-2 text-sm font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-red-500 via-red-600 to-red-700 backdrop-blur-sm bg-opacity-90 animate-pulse-glow">
                          <span className="flex items-center drop-shadow-md">
                            <i className="mr-1 fas fa-tag"></i>
                            {product.discount}% ছাড়
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Modern New Badge */}
                    {product.discount === 0 && (
                      <motion.div
                        className="absolute z-30 top-4 left-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + index * 0.2 }}
                      >
                        <div className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-green-500 via-green-600 to-green-700 backdrop-blur-sm bg-opacity-90 animate-float">
                          <span className="flex items-center drop-shadow-md">
                            <i className="mr-1 fas fa-star"></i>
                            নতুন
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Modern Image Container */}
                    <Link
                      to={`/product/${product._id}`}
                      state={{ product }}
                      className="relative block overflow-hidden group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={
                            product.image ||
                            "https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri"
                          }
                          alt={product.name}
                          className="object-cover w-full h-64 transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 img-modern"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri";
                          }}
                        />

                        {/* Modern Image Overlay */}
                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:opacity-100"></div>

                        {/* Modern View Details Badge */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100"
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                        >
                          <div className="px-6 py-3 font-semibold text-green-700 transition-transform duration-500 transform translate-y-4 border rounded-full shadow-xl bg-white/95 backdrop-blur-sm group-hover:translate-y-0 border-green-200/50">
                            <i className="mr-2 fas fa-eye"></i>
                            বিস্তারিত দেখুন
                          </div>
                        </motion.div>
                      </div>
                    </Link>

                    {/* Modern Content Container */}
                    <div className="relative p-6 bg-gradient-to-b from-white via-white to-gray-50/80">
                      {/* Modern Title */}
                      <motion.h3
                        className="mb-3 text-2xl font-bold leading-tight text-gray-800 transition-colors duration-300 hover:text-green-700 group-hover:text-green-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 + index * 0.2 }}
                      >
                        {product.name}
                      </motion.h3>

                      {/* Modern Description */}
                      <motion.p
                        className="mb-6 text-sm font-medium leading-relaxed text-gray-600 transition-colors duration-300 line-clamp-2 group-hover:text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.0 + index * 0.2 }}
                      >
                        {product.description}
                      </motion.p>

                      {/* Modern Price and Action Section */}
                      <motion.div
                        className="flex items-center justify-between pt-4 border-t border-gray-100/80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2 + index * 0.2 }}
                      >
                        {/* Modern Price Display */}
                        <div className="flex flex-col">
                          {product.discount > 0 ? (
                            <>
                              <span className="text-base font-medium text-gray-400 line-through">
                                ৳{product.price}
                              </span>
                              <span className="text-2xl font-extrabold text-gradient mt-0.5">
                                ৳
                                {(
                                  product.price *
                                  (1 - product.discount / 100)
                                ).toFixed(2)}
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
                          <i className="mr-2 fas fa-plus"></i>
                          অর্ডার করুন
                        </motion.button>
                      </motion.div>

                      {/* Modern Hover Effects */}
                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-br from-green-500/5 to-transparent group-hover:opacity-100"></div>

                      {/* Modern Corner Decorations */}
                      <div className="absolute top-0 right-0 w-8 h-8 transition-opacity duration-500 rounded-bl-full opacity-0 bg-gradient-to-br from-green-500/20 to-transparent group-hover:opacity-100"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 transition-opacity duration-500 rounded-tr-full opacity-0 bg-gradient-to-tr from-green-500/20 to-transparent group-hover:opacity-100"></div>
                    </div>

                    {/* Modern Glow Effect on Hover */}
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10 group-hover:opacity-100 rounded-3xl"></div>

                    {/* Modern Border Animation */}
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-3xl bg-gradient-to-r from-green-500 via-green-600 to-green-500 group-hover:opacity-20"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Modern View All Button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <Link
              to="/menu"
              className="inline-block px-8 py-4 font-bold text-white transition-all duration-300 transform shadow-lg btn-modern bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-2xl hover:shadow-xl hover:-translate-y-1"
            >
              <i className="mr-3 fas fa-utensils"></i>
              সব আইটেম দেখুন
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Special Offers Section */}
      {discountedProducts.length > 0 && (
        <motion.div
          className="relative mb-20 z-content special-offers-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Modern Section Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-white to-yellow-50/30 rounded-3xl"></div>

          {/* Modern Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>

          <div className="relative z-10 p-4">
            {/* Modern Section Header */}
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative inline-block">
                <motion.h2
                  className="relative mb-6 text-4xl font-extrabold text-gray-900 lg:text-5xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <span className="text-transparent bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 bg-clip-text">
                    স্পেশাল অফার
                  </span>
                  <span className="ml-3 text-3xl animate-pulse">🔥</span>
                </motion.h2>
                {/* Modern Underline Animation */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                ></motion.div>
              </div>

              <motion.p
                className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                বিশেষ ছাড়ে পাচ্ছেন আপনার প্রিয় খিচুড়ি আইটেমগুলো
                {discountedProducts.length > 3 && !showAllOffers && (
                  <span className="block mt-2 text-lg font-semibold text-red-600">
                    আরও {discountedProducts.length - 3}টি অফার দেখতে ক্লিক করুন
                  </span>
                )}
              </motion.p>

              {/* Modern Decorative Icons */}
              <motion.div
                className="flex justify-center mt-6 space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 animate-pulse-glow">
                  <i className="text-sm text-red-600 fas fa-fire"></i>
                </div>
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 animate-pulse-glow"
                  style={{ animationDelay: "0.5s" }}
                >
                  <i className="text-sm text-yellow-600 fas fa-tag"></i>
                </div>
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 animate-pulse-glow"
                  style={{ animationDelay: "1s" }}
                >
                  <i className="text-sm text-orange-600 fas fa-star"></i>
                </div>
              </motion.div>
            </motion.div>

            {/* Special Offers Products Grid - Same structure as Popular Items */}
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                layout: { duration: 0.5, ease: "easeInOut" }
              }}
              layout
            >
              <AnimatePresence mode="popLayout">
                {displayedOffers.map((product, index) => (
                  <motion.div
                    key={product._id}
                    data-id={product._id}
                    className="relative snap-item group"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    layout
                    transition={{
                      duration: 0.6,
                      delay: showAllOffers ? index * 0.1 : 1.4 + index * 0.2,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: -15,
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    onHoverStart={() => setHoveredProduct(product._id)}
                    onHoverEnd={() => setHoveredProduct(null)}
                  >
                    {/* Modern Card Container - Same structure as Popular Items */}
                    <div className="relative w-full overflow-hidden transition-all duration-500 transform border menu-card-modern group rounded-3xl shadow-modern hover:shadow-glow hover-lift border-gray-100/20 bg-white/95 backdrop-blur-sm">
                      {/* Modern Discount Badge */}
                      <motion.div
                        className="absolute z-30 top-4 left-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + index * 0.2 }}
                      >
                        <div className="px-4 py-2 text-sm font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-red-500 via-red-600 to-red-700 backdrop-blur-sm bg-opacity-90 animate-pulse-glow">
                          <span className="flex items-center drop-shadow-md">
                            <i className="mr-1 fas fa-tag"></i>
                            {product.discount}% ছাড়
                          </span>
                        </div>
                      </motion.div>

                      {/* Modern Image Container */}
                      <Link
                        to={`/product/${product._id}`}
                        state={{ product }}
                        className="relative block overflow-hidden group"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={
                              product.image ||
                              "https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri"
                            }
                            alt={product.name}
                            className="object-cover w-full h-64 transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 img-modern"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri";
                            }}
                          />

                          {/* Modern Image Overlay */}
                          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:opacity-100"></div>

                          {/* Modern View Details Badge */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100"
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                          >
                            <div className="px-6 py-3 font-semibold text-red-700 transition-transform duration-500 transform translate-y-4 border rounded-full shadow-xl bg-white/95 backdrop-blur-sm group-hover:translate-y-0 border-red-200/50">
                              <i className="mr-2 fas fa-eye"></i>
                              বিস্তারিত দেখুন
                            </div>
                          </motion.div>
                        </div>
                      </Link>

                      {/* Modern Content Container */}
                      <div className="relative p-6 bg-gradient-to-b from-white via-white to-gray-50/80">
                        {/* Modern Title */}
                        <motion.h3
                          className="mb-3 text-2xl font-bold leading-tight text-gray-800 transition-colors duration-300 hover:text-red-700 group-hover:text-red-600"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.8 + index * 0.2 }}
                        >
                          {product.name}
                        </motion.h3>

                        {/* Modern Description */}
                        <motion.p
                          className="mb-6 text-sm font-medium leading-relaxed text-gray-600 transition-colors duration-300 line-clamp-2 group-hover:text-gray-700"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.0 + index * 0.2 }}
                        >
                          {product.description}
                        </motion.p>

                        {/* Modern Price and Action Section */}
                        <motion.div
                          className="flex items-center justify-between pt-4 border-t border-gray-100/80"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.2 + index * 0.2 }}
                        >
                          {/* Modern Price Display */}
                          <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-400 line-through">
                              ৳{product.price}
                            </span>
                            <span className="text-2xl font-extrabold text-gradient mt-0.5">
                              ৳{(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                          </div>

                          {/* Modern Add to Cart Button */}
                          <motion.button
                            onClick={() => addToCart(product._id, 1)}
                            className="btn-modern bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus-modern"
                            aria-label={`Add ${product.name} to cart`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <i className="mr-2 fas fa-plus"></i>
                            অর্ডার করুন
                          </motion.button>
                        </motion.div>

                        {/* Modern Hover Effects */}
                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-br from-red-500/5 to-transparent group-hover:opacity-100"></div>

                        {/* Modern Corner Decorations */}
                        <div className="absolute top-0 right-0 w-8 h-8 transition-opacity duration-500 rounded-bl-full opacity-0 bg-gradient-to-br from-red-500/20 to-transparent group-hover:opacity-100"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 transition-opacity duration-500 rounded-tr-full opacity-0 bg-gradient-to-tr from-red-500/20 to-transparent group-hover:opacity-100"></div>
                      </div>

                      {/* Modern Glow Effect on Hover */}
                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-r from-red-500/10 via-transparent to-yellow-500/10 group-hover:opacity-100 rounded-3xl"></div>

                      {/* Modern Border Animation */}
                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 group-hover:opacity-20"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Modern View All Offers Button */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              {/* Counter Indicator */}
              {discountedProducts.length > 3 && (
                <motion.div
                  className="mb-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white/80 rounded-full shadow-sm">
                      {displayedOffers.length} / {discountedProducts.length} অফার দেখানো হচ্ছে
                    </span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(displayedOffers.length / discountedProducts.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {discountedProducts.length > 3 && (
                <motion.button
                  onClick={() => {
                    setIsLoadingOffers(true);
                    setTimeout(() => {
                      setShowAllOffers(!showAllOffers);
                      setIsLoadingOffers(false);
                      // Smooth scroll to the offers section when expanding
                      if (!showAllOffers) {
                        setTimeout(() => {
                          document.querySelector('.special-offers-section')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }, 500);
                      } else {
                        // Add a subtle celebration effect when collapsing
                        const offersSection = document.querySelector('.special-offers-section');
                        if (offersSection) {
                          offersSection.style.transform = 'scale(0.98)';
                          setTimeout(() => {
                            offersSection.style.transform = 'scale(1)';
                          }, 200);
                        }
                      }
                    }, 300);
                  }}
                  className="inline-block px-8 py-4 font-bold text-white transition-all duration-300 transform shadow-lg btn-modern bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-2xl hover:shadow-xl hover:-translate-y-1"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                  disabled={isLoadingOffers}
                >
                  <motion.i
                    className={`mr-3 fas ${isLoadingOffers ? 'fa-spinner' : showAllOffers ? 'fa-chevron-up' : 'fa-fire'}`}
                    animate={{
                      rotate: isLoadingOffers ? 360 : showAllOffers ? 180 : 0
                    }}
                    transition={{
                      duration: isLoadingOffers ? 1 : 0.3,
                      repeat: isLoadingOffers ? Infinity : 0
                    }}
                  ></motion.i>
                  <motion.span
                    key={isLoadingOffers ? 'loading' : showAllOffers ? 'show-less' : 'show-all'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLoadingOffers ? 'লোড হচ্ছে...' : showAllOffers ? 'কম অফার দেখুন' : 'সব অফার দেখুন'}
                  </motion.span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}

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
      <div className="fixed w-20 h-20 rounded-full pointer-events-none top-20 right-10 bg-green-100/20 blur-xl animate-float z-floating"></div>
      <div
        className="fixed w-16 h-16 rounded-full pointer-events-none bottom-20 left-10 bg-green-200/20 blur-lg animate-float z-floating"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="fixed w-12 h-12 rounded-full pointer-events-none top-1/2 right-1/4 bg-green-300/20 blur-md animate-pulse-glow z-floating"></div>
    </div>
  );
};

export default Home;
