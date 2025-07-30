import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails } = location.state || {};

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">অর্ডার বিবরণ পাওয়া যায়নি</h2>
          <p className="mb-6 text-gray-600">দুঃখিত, আমরা আপনার অর্ডার বিবরণ খুঁজে পাচ্ছি না।</p>
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 font-bold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
          >
            হোমপেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Order Confirmation Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            ধন্যবাদ! আপনার অর্ডারটি নিশ্চিত হয়েছে
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            অর্ডার নম্বর: <span className="font-semibold">{orderDetails.orderNumber}</span>
          </p>
          <p className="mt-2 text-gray-500">
            আমরা আপনার অর্ডারটি পেয়েছি এবং প্রক্রিয়া করছি।
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-8 overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-gray-50">
            <h3 className="flex items-center text-lg font-medium leading-6 text-gray-900">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
              অর্ডার সংক্ষেপ
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h4 className="mb-4 text-lg font-medium text-gray-900">অর্ডার বিবরণ</h4>
                <dl className="space-y-3">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">অর্ডার নম্বর</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {orderDetails.orderNumber}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">তারিখ</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(orderDetails.orderDate).toLocaleString('bn-BD', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">মোট পরিমাণ</dt>
                    <dd className="mt-1 text-sm font-semibold text-green-600 sm:mt-0 sm:col-span-2">
                      ৳{parseFloat(orderDetails.total).toFixed(2)}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">পেমেন্ট পদ্ধতি</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {orderDetails.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (COD)' : orderDetails.paymentMethod}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">অবস্থা</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                        {orderDetails.status === 'pending' ? 'প্রক্রিয়াধীন' : orderDetails.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 className="mb-4 text-lg font-medium text-gray-900">গ্রাহক তথ্য</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">ঠিকানা</p>
                      <p className="text-sm text-gray-500">{orderDetails.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">ফোন নম্বর</p>
                      <p className="text-sm text-gray-500">{orderDetails.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8 overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-gray-50">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              অর্ডারকৃত আইটেম সমূহ
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {orderDetails.items.map((item, index) => (
                  <li key={index} className="py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-200 rounded-md">
                        <img
                          src={item.image || 'https://placehold.co/80x80/6B8E23/FFFFFF?text=Khichuri'}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">৳{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            পরিমাণ: {item.quantity} × ৳{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 mt-8 border-t border-gray-200">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>মোট</p>
                <p>৳{parseFloat(orderDetails.total).toFixed(2)}</p>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                ডেলিভারি চার্জ এবং ট্যাক্স অন্তর্ভুক্ত (যদি প্রযোজ্য)
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8 overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-gray-50">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              পরবর্তী ধাপসমূহ
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 text-green-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">অর্ডার নিশ্চিতকরণ</p>
                  <p className="text-sm text-gray-500">আমরা আপনার অর্ডারটি পেয়েছি এবং এটি প্রক্রিয়া করছি।</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 text-gray-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">প্রস্তুতি</p>
                  <p className="text-sm text-gray-500">আমাদের রান্নাঘর আপনার অর্ডারটি প্রস্তুত করছে।</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 text-gray-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">ডেলিভারি</p>
                  <p className="text-sm text-gray-500">আমাদের ডেলিভারি পার্টনার আপনার অর্ডারটি নিয়ে যাচ্ছেন।</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 text-center sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">আরও সাহায্য প্রয়োজন?</h3>
            <div className="max-w-xl mt-2 text-sm text-gray-500">
              <p>আমাদের গ্রাহক সেবা দল আপনার যেকোনো প্রশ্নের উত্তর দিতে প্রস্তুত।</p>
            </div>
            <div className="mt-5">
              <a
                href="tel:+৮৮০১২৩৪৫৬৭৮৯০"
                className="inline-flex items-center justify-center px-4 py-2 font-medium text-green-700 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
              >
                <svg className="w-5 h-5 mr-2 -ml-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                কল করুন: +880 1712 345 678
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-4 mt-8 sm:flex-row">
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            আরও অর্ডার করুন
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            হোমপেজে ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
