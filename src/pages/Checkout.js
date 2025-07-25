import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart = [], total = 0, submitOrder }) => {
  // Ensure cart is always an array to prevent map errors
  const safeCart = Array.isArray(cart) ? cart : [];
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    address: '', 
    payment: 'cod' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields including email
    if (!form.name || !form.phone || !form.address || !form.email) {
      return alert('দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন (নাম, ফোন, ঠিকানা এবং ইমেইল আবশ্যক)');
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return alert('দয়া করে একটি বৈধ ইমেইল ঠিকানা দিন');
    }
    
    setIsSubmitting(true);
    try {
      const orderNumber = 'ORD-' + Date.now().toString().slice(-6).toUpperCase();
      const orderData = {
        ...form,
        customerName: form.name, // Ensure customerName is set
        customerData: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          email: form.email || 'no-email@example.com'
        }),
        paymentMethod: form.payment,
        orderNumber
      };
      
      console.log('Submitting order:', orderData);
      await submitOrder(orderData);
      
      // Navigate directly to order confirmation without showing alert
      navigate('/order-confirmation', {
        state: {
          orderDetails: {
            orderNumber,
            name: form.name,
            phone: form.phone,
            address: form.address,
            paymentMethod: form.payment || 'cod',
            items: safeCart.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image
            })),
            total: total,
            orderDate: new Date().toISOString(),
            status: 'pending'
          }
        }
      });
      
    } catch (error) {
      console.error('অর্ডার জমা দিতে সমস্যা হয়েছে:', error);
      alert('দুঃখিত, অর্ডার জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (safeCart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <div className="text-6xl mb-4 text-gray-300">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">আপনার কার্ট খালি</h2>
          <p className="text-gray-600 mb-6">অর্ডার করতে প্রথমে কিছু আইটেম কার্টে যোগ করুন</p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full"
          >
            <i className="fas fa-home mr-2"></i> হোমপেজে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">অর্ডার সম্পূর্ণ করুন</span>
            <span className="block text-green-600 text-xl mt-2">আপনার পছন্দের খাবারটি আপনার দরজায়</span>
          </h1>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
<div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">আপনার অর্ডার</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {safeCart.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    আপনার কার্টে কোনো আইটেম নেই
                  </div>
                ) : (
                  safeCart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border-b border-gray-100">
                      <div className="flex items-center">
                        <img 
                          src={item.image || 'https://placehold.co/80x80/6B8E23/FFFFFF?text=Khichuri'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500">পরিমাণ: {item.quantity} × ৳{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <span className="font-medium">৳{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-100 mt-8">
                  <i className="fas fa-truck text-green-500 mr-2"></i> ডেলিভারি তথ্য
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="আপনার পুরো নাম লিখুন"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        ফোন নম্বর <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        placeholder="01XXXXXXXXX"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        ইমেইল <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        placeholder="আপনার ইমেইল দিন"
                        required
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                        title="দয়া করে একটি বৈধ ইমেইল ঠিকানা দিন"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="বাড়ি নং, রাস্তা নং, এলাকা, শহর"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">পেমেন্ট পদ্ধতি</h3>
                <div className="space-y-3 mb-6">
                  <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={form.payment === 'cod'}
                      onChange={handleChange}
                      className="h-5 w-5 text-green-500 border-gray-300 focus:ring-green-400 mt-1"
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">ক্যাশ অন ডেলিভারি (COD)</span>
                      <span className="block text-sm text-gray-500">ডেলিভারি সময়ে নগদে পেমেন্ট করুন</span>
                    </div>
                  </label>
                  
                  <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="bkash"
                      checked={form.payment === 'bkash'}
                      onChange={handleChange}
                      className="h-5 w-5 text-green-500 border-gray-300 focus:ring-green-400 mt-1"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="block text-sm font-medium text-gray-700 mr-2">বিকাশ</span>
                        <img src="https://seeklogo.com/images/B/bkash-logo-FD5593F6EB-seeklogo.com.png" alt="bKash" className="h-5" />
                      </div>
                      <span className="block text-sm text-gray-500 mt-1">বিকাশ নম্বর: 01712345678 (পারসোনাল)</span>
                      {form.payment === 'bkash' && (
                        <div className="mt-2 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                          <p className="text-sm text-yellow-700">অনুগ্রহ করে বিকাশে পেমেন্ট করে নিচের তথ্যগুলো দিন:</p>
                          <p className="text-sm font-medium mt-1">বিকাশ নম্বর: <span className="text-green-600">01712345678</span></p>
                          <p className="text-sm font-medium">রেফারেন্স: <span className="text-green-600">ORD{Date.now().toString().slice(-6)}</span></p>
                        </div>
                      )}
                    </div>
                  </label>
                  
                  <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="nagad"
                      checked={form.payment === 'nagad'}
                      onChange={handleChange}
                      className="h-5 w-5 text-green-500 border-gray-300 focus:ring-green-400 mt-1"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="block text-sm font-medium text-gray-700 mr-2">নগদ</span>
                        <img src="https://seeklogo.com/images/N/nagad-logo-9C3E1A0C2A-seeklogo.com.png" alt="Nagad" className="h-5" />
                      </div>
                      <span className="block text-sm text-gray-500 mt-1">নগদ নম্বর: 01712345678 (পারসোনাল)</span>
                      {form.payment === 'nagad' && (
                        <div className="mt-2 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                          <p className="text-sm text-yellow-700">অনুগ্রহ করে নগদে পেমেন্ট করে নিচের তথ্যগুলো দিন:</p>
                          <p className="text-sm font-medium mt-1">নগদ নম্বর: <span className="text-green-600">01712345678</span></p>
                          <p className="text-sm font-medium">রেফারেন্স: <span className="text-green-600">ORD{Date.now().toString().slice(-6)}</span></p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      অর্ডার দেওয়া হচ্ছে...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check-circle mr-2"></i> অর্ডার নিশ্চিত করুন
                    </>
                  )}
                </button>

                {/* Cancel / Go Back Button */}
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <i className="fas fa-arrow-left mr-2"></i> পরে অর্ডার করবেন
                </button>
                 
                 <p className="mt-3 text-center text-sm text-gray-500">
                  অর্ডার দিয়ে আপনি আমাদের <a href="#" className="text-green-600 hover:underline">সার্ভিস শর্তাবলী</a> এবং <a href="#" className="text-green-600 hover:underline">গোপনীয়তা নীতি</a> মেনে নিচ্ছেন
                </p>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>কোনো সমস্যায় কল করুন: <a href="tel:+8801712345678" className="text-green-600 hover:underline">+880 1712 345 678</a></p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
