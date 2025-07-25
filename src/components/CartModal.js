import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ isOpen, onClose, cart, removeFromCart, updateQuantity, calculateCartTotal }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">আপনার কার্ট</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <i className="fas fa-times text-2xl"></i>
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
                            <p className="text-gray-600">আপনার কার্ট খালি</p>
                            <button 
                                onClick={onClose}
                                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                            >
                                শপিং চালিয়ে যান
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex items-center border-b pb-4">
                                        <img 
                                            src={item.image || 'https://placehold.co/100x100/6B8E23/FFFFFF?text=Khichuri'} 
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="ml-4 flex-1">
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-yellow-600 font-bold">
                                                ৳{(item.price * (1 - (item.discount || 0) / 100) * item.quantity).toFixed(2)}
                                                {item.discount > 0 && (
                                                    <span className="text-sm text-gray-500 line-through ml-2">
                                                        ৳{(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <button 
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center border rounded-l-md hover:bg-gray-100"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="w-10 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center border rounded-r-md hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                            <button 
                                                onClick={() => removeFromCart(item._id)}
                                                className="ml-2 text-red-500 hover:text-red-700"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between text-lg font-bold mb-6">
                                    <span>মোট</span>
                                    <span>৳{calculateCartTotal()}</span>
                                </div>
                                <button 
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                                    onClick={() => {
                                        navigate('/checkout');
                                        onClose();
                                    }}
                                >
                                    চেকআউট করুন
                                </button>
                                <button 
                                    onClick={onClose}
                                    className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300"
                                >
                                    শপিং চালিয়ে যান
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartModal;
