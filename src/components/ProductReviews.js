import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewForm from './ReviewForm';

const API_BASE_URL = 'https://khichuri-backend-api.onrender.com/api';

/**
 * Modern review list component with advanced styling and animations
 * Props:
 *  - productId
 *  - submitReview (function) – optional; if not provided, local fetch is used.
 */
const ProductReviews = ({ productId, submitReview: submitFn }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const loadReviews = async () => {
    console.log('Loading reviews for product:', productId);
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/products/${productId}/reviews`;
      console.log('Fetching from URL:', url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        credentials: 'include'
      });

      console.log('Review fetch response status:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Fetched reviews:', data);

      // Process the reviews
      const processedReviews = Array.isArray(data)
        ? data.map(r => ({
          ...r,
          _id: r._id || Math.random().toString(36).substr(2, 9),
          author: r.author || 'Anonymous',
          date: r.date || r.createdAt || new Date().toISOString(),
          rating: parseInt(r.rating, 10) || 5
        }))
        : [];

      console.log('Processed reviews:', processedReviews);
      setReviews(processedReviews);

      // If no reviews, add a test review in development
      if (processedReviews.length === 0 && process.env.NODE_ENV === 'development') {
        const testReview = {
          _id: 'test' + Date.now(),
          author: 'Test User',
          rating: 5,
          comment: 'This is a test review',
          date: new Date().toISOString()
        };
        console.log('Adding test review:', testReview);
        setReviews([testReview]);
      }
    } catch (e) {
      console.error('Failed to fetch reviews:', e);
      // Fallback to empty array in production, test data in development
      if (process.env.NODE_ENV === 'development') {
        const fallbackReview = {
          _id: 'fallback' + Date.now(),
          author: 'Fallback User',
          rating: 4,
          comment: 'This is a fallback review',
          date: new Date().toISOString()
        };
        console.log('Using fallback review:', fallbackReview);
        setReviews([fallbackReview]);
      } else {
        setReviews([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('ProductReviews mounted or productId changed:', productId);
    loadReviews();
  }, [productId]);

  const submitReview = submitFn || (async (pid, data) => {
    // Try backend first; if fails, fall back to local-only save so UX stays smooth

    try {
      let res;
      try {
        res = await fetch(`${API_BASE_URL}/products/${pid}/reviews`, {

          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            author: data.name,
            rating: data.rating,
            comment: data.comment,
          }),
        });
        if (res.ok) {
          const newRev = await res.json();
          setReviews(prev => [newRev, ...prev]);
          return true;
        }
      } catch (err) {
        console.warn('Backend unreachable, saving review locally', err);
      }
      // fallback local review object
      const localReview = {
        date: new Date().toISOString(),
        author: data.name,
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      setReviews(prev => [localReview, ...prev]);
      return true;
    } catch (e) {
      console.error('Review submit error', e);
      return false;
    }
  });

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <motion.div
      className="mt-12 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-modern border border-gray-100/50 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 bg-gradient-pattern opacity-5 rounded-3xl"></div>

      {/* Modern Header */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <motion.h2
              className="text-3xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <i className="fas fa-star text-yellow-500 mr-3"></i>
              কাস্টমার রিভিউ ({reviews.length}টি)
            </motion.h2>
            {reviews.length > 0 && (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fas fa-star text-xl ${star <= Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                    ></i>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {averageRating.toFixed(1)} / 5.0
                </span>
              </motion.div>
            )}
          </div>

          <motion.button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn-modern bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-plus mr-2"></i>
            রিভিউ দিন
          </motion.button>
        </div>
      </div>

      {/* Modern Loading State */}
      {loading ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">রিভিউ লোড হচ্ছে...</p>
        </motion.div>
      ) : (
        <>
          {/* Modern Reviews List */}
          <div className="space-y-6 mb-8">
            {reviews.length === 0 ? (
              <motion.div
                className="text-center py-12 bg-gray-50/50 rounded-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <i className="fas fa-comment-slash text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">কোনো রিভিউ নেই</h3>
                <p className="text-gray-500">এই প্রোডাক্টের জন্য এখনও কোনো রিভিউ নেই। আপনি প্রথম রিভিউটি করতে পারেন!</p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {reviews.map((review, index) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {(review.author || review.name || 'A').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                            {review.author || review.name || 'Anonymous'}
                          </h4>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={star}
                                className={`fas fa-star text-sm ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
                                  }`}
                              ></i>
                            ))}
                            <span className="text-sm text-gray-500 ml-2">
                              {review.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(review.date || review.createdAt).toLocaleDateString('bn-BD', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {review.comment}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </>
      )}

      {/* Modern Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 pt-8">
              <ReviewForm
                productId={productId}
                submitReview={submitReview}
                onSubmitted={(review) => {
                  setReviews(prev => [review, ...prev]); // নতুন রিভিউ সাথে সাথে দেখান
                  setShowReviewForm(false);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Decorative Elements */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-green-500/10 rounded-full blur-sm"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 bg-yellow-500/10 rounded-full blur-sm"></div>
    </motion.div>
  );
};

export default ProductReviews;
