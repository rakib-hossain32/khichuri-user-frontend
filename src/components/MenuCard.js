import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Card component used in Menu page (horizontal scroll on mobile).
 * Props: product (object), addToCart (fn)
 */
const MenuCard = ({ product, addToCart }) => {
  return (
    <div
      data-id={product._id}
      className={`snap-item relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 w-80 flex-shrink-0 snap-center md:w-auto transform hover:-translate-y-2 hover:scale-105 border border-gray-100`}
    >
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg z-10">
          <span className="drop-shadow-sm">{product.discount}% ছাড়</span>
        </div>
      )}
      <Link to={`/product/${product._id}`} state={{product}}
        className="block">
        <img
        src={product.image || 'https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri'}
        alt={product.name}
        className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri';
        }}
      />
      </Link>
      <div className="p-6 bg-gradient-to-b from-white to-gray-50">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">{product.name}</h3>
        {product.rating && (
          <div className="flex items-center mb-2" aria-label={`রেটিং ${product.rating} স্টার`}>
            {[1,2,3,4,5].map(i => (
              <i key={i} className={`fas fa-star ${i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.rating.toFixed(1)})</span>
          </div>
        )}
        <p className="text-gray-600 mb-5 text-sm leading-relaxed line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          {product.discount > 0 ? (
            <div>
              <span className="text-lg font-semibold text-gray-400 line-through">৳{product.price}</span>
              <span className="text-2xl font-bold text-green-600 ml-2">
                ৳{(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-green-600">৳{product.price}</span>
          )}
          <button
            onClick={() => addToCart(product._id, 1)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            অর্ডার করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
