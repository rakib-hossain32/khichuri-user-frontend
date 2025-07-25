import React, { useState } from 'react';

/**
 * A small form that lets a user submit a review (name, rating 1-5, comment)
 * Expects:
 *  - productId: string
 *  - onSubmitted: (review)=>void   – callback with the created review
 *  - submitReview: (productId, data)=>Promise<Boolean>  – function from parent (usually from App)
 */
const ReviewForm = ({ productId, submitReview, onSubmitted }) => {
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState(false);

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
      onSubmitted();
      setForm({ name: '', rating: 0, comment: '' });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <label className="block text-lg font-semibold mb-2">আপনার রেটিং:</label>
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`cursor-pointer text-3xl ${form.rating >= n ? 'text-yellow-500' : 'text-gray-300'} transition-transform transform hover:scale-110`}
            onClick={() => setForm((prev) => ({ ...prev, rating: n }))}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        name="comment"
        value={form.comment}
        onChange={handleChange}
        required
        rows="4"
        placeholder="আপনার মন্তব্য"
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="আপনার নাম"
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
      />
      <button
        disabled={loading || form.rating === 0}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg w-full transition-transform transform hover:-translate-y-1"
      >
        {loading ? 'সাবমিট হচ্ছে...' : 'রিভিউ জমা দিন'}
      </button>
    </form>
  );
};

export default ReviewForm;
