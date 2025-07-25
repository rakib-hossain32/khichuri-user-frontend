import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img 
                src={product.image || 'https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri'} 
                alt={product.name} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400/6B8E23/FFFFFF?text=Khichuri';
                }}
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">
                    {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                </p>
                <div className="flex justify-between items-center">
                    {product.discount > 0 ? (
                        <div>
                            <span className="text-lg font-bold text-gray-500 line-through">৳{product.price}</span>
                            <span className="text-xl font-bold text-yellow-600 ml-2">
                                ৳{(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-yellow-600">৳{product.price}</span>
                    )}
                    <button 
                        onClick={() => onAddToCart(product._id, 1)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        অর্ডার করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
