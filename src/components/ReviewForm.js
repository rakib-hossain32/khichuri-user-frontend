import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Modern review form component with advanced styling and animations
 * Expects:
 *  - productId: string
 *  - onSubmitted: (review)=>void   – callback with the created review
 *  - submitReview: (productId, data)=>Promise<Boolean>  – function from parent (usually from App)
 */
const ReviewForm = ({ productId, submitReview, onSubmitted }) => {
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (form.rating === 0) {
      alert('দয়া করে একটি রেটিং নির্বাচন করুন');
      return;
    }
    setLoading(true);
    const success = await submitReview(productId, form);
    if (success && onSubmitted) {
      onSubmitted(form); // সাবমিটেড রিভিউ ডাটা পাঠান
      setForm({ name: '', rating: 0, comment: '' });
    }
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 mt-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-modern border border-gray-100/50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Modern Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          <i className="fas fa-star text-yellow-500 mr-3"></i>
          আপনার রিভিউ দিন
        </h3>
        <p className="text-gray-600">আপনার অভিজ্ঞতা শেয়ার করুন</p>
      </div>

      {/* Modern Rating Section */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          <i className="fas fa-star text-yellow-500 mr-2"></i>
          আপনার রেটিং:
        </label>
        <div className="flex items-center justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.span
              key={n}
              className={`cursor-pointer text-4xl transition-all duration-300 ${(hoveredRating >= n || form.rating >= n) ? 'text-yellow-500' : 'text-gray-300'
                } hover:text-yellow-400`}
              onClick={() => setForm((prev) => ({ ...prev, rating: n }))}
              onMouseEnter={() => setHoveredRating(n)}
              onMouseLeave={() => setHoveredRating(0)}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              ★
            </motion.span>
          ))}
        </div>
        {form.rating > 0 && (
          <motion.div
            className="text-center text-green-600 font-semibold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            আপনি {form.rating} স্টার দিয়েছেন
          </motion.div>
        )}
      </div>

      {/* Modern Comment Input */}
      <div className="space-y-2">
        <label className="block text-lg font-semibold text-gray-800">
          <i className="fas fa-comment text-green-500 mr-2"></i>
          আপনার মন্তব্য:
        </label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          required
          rows="4"
          placeholder="আপনার অভিজ্ঞতা এবং মতামত শেয়ার করুন..."
          className="input-modern w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 resize-none"
        />
      </div>

      {/* Modern Name Input */}
      <div className="space-y-2">
        <label className="block text-lg font-semibold text-gray-800">
          <i className="fas fa-user text-green-500 mr-2"></i>
          আপনার নাম:
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="আপনার নাম লিখুন..."
          className="input-modern w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
        />
      </div>

      {/* Modern Submit Button */}
      <motion.button
        disabled={loading || form.rating === 0}
        className={`w-full btn-modern font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 ${loading || form.rating === 0
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-xl'
          }`}
        whileHover={!loading && form.rating > 0 ? { scale: 1.02, y: -2 } : {}}
        whileTap={!loading && form.rating > 0 ? { scale: 0.98 } : {}}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            সাবমিট হচ্ছে...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <i className="fas fa-paper-plane mr-3"></i>
            রিভিউ জমা দিন
          </div>
        )}
      </motion.button>

      {/* Modern Decorative Elements */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-green-500/10 rounded-full blur-sm"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 bg-yellow-500/10 rounded-full blur-sm"></div>
    </motion.form>
  );
};

export default ReviewForm;
