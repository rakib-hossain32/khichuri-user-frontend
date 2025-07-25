import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cart from localStorage
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <div className="text-6xl text-green-500 mb-6 flex justify-center">
          <FaCheckCircle />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">অর্ডার সফল হয়েছে!</h2>
        <p className="text-gray-600 mb-6">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <FaHome className="mr-2" /> হোমপেজে ফিরে যান
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="w-full bg-white border-2 border-green-500 text-green-500 hover:bg-green-50 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <FaShoppingBag className="mr-2" /> আরও অর্ডার করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
