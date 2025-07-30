import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://khichuri-backend-api.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Message sent successfully:', formData);
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
            } else {
                console.error('Failed to send message');
                alert('মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
            <div className="container mx-auto px-4 py-12 lg:py-20">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        যোগাযোগ করুন
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
                    <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
                        আমাদের সাথে যোগাযোগ করুন। আমরা আপনার প্রশ্নের উত্তর দিতে এবং আপনার অভিজ্ঞতা উন্নত করতে এখানে আছি।
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Contact Form */}
                            <div className="p-8 lg:p-12 bg-gradient-to-br from-green-50 to-white">
                                <div className="mb-8">
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                        আমাদেরকে বার্তা পাঠান
                                    </h2>
                                    <div className="w-16 h-1 bg-green-500 rounded-full"></div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="group">
                                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-3 text-lg">
                                            আপনার নাম
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-lg"
                                                placeholder="আপনার নাম লিখুন"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-3 text-lg">
                                            ইমেইল ঠিকানা
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-lg"
                                                placeholder="আপনার ইমেইল লিখুন"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-3 text-lg">
                                            আপনার বার্তা
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="6"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-lg resize-none"
                                            placeholder="আপনার বার্তা লিখুন..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center space-x-2`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>পাঠানো হচ্ছে...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                <span>পাঠান</span>
                                            </>
                                        )}
                                    </button>

                                    {success && (
                                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-green-700 font-medium">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div className="p-8 lg:p-12 bg-white">
                                <div className="mb-8">
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                        আমাদের সাথে যোগাযোগ
                                    </h2>
                                    <div className="w-16 h-1 bg-green-500 rounded-full"></div>
                                </div>

                                <div className="space-y-8">
                                    <div className="group flex items-start p-4 rounded-2xl hover:bg-green-50 transition-all duration-300">
                                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl mr-4 shadow-lg">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg mb-2">ঠিকানা</h4>
                                            <p className="text-gray-600 leading-relaxed">
                                                বেইলী ব্রিজ, পাচ্চঁর, শিবচর<br />
                                                মাদারীপুর, বাংলাদেশ
                                            </p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start p-4 rounded-2xl hover:bg-green-50 transition-all duration-300">
                                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl mr-4 shadow-lg">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg mb-2">ফোন নম্বর</h4>
                                            <p className="text-gray-600 text-lg font-medium">+8801648202601</p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start p-4 rounded-2xl hover:bg-green-50 transition-all duration-300">
                                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl mr-4 shadow-lg">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg mb-2">ইমেইল</h4>
                                            <p className="text-gray-600 text-lg font-medium">khichurighorbd@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start p-4 rounded-2xl hover:bg-green-50 transition-all duration-300">
                                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl mr-4 shadow-lg">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg mb-2">খোলার সময়</h4>
                                            <div className="text-gray-600 space-y-1">
                                                <p className="flex justify-between">
                                                    <span>শুক্রবার:</span>
                                                    <span className="font-medium text-red-600">বন্ধ</span>
                                                </p>
                                                <p className="flex justify-between">
                                                    <span>সোমবার:</span>
                                                    <span className="font-medium">সকাল 11টা - রাত 10টা</span>
                                                </p>
                                                <p className="flex justify-between">
                                                    <span>শনিবার - রবিবার:</span>
                                                    <span className="font-medium">বিকাল 12টা - রাত 11টা</span>
                                                </p>
                                                <p className="flex justify-between">
                                                    <span>বুধবার - বৃহস্পতিবার:</span>
                                                    <span className="font-medium">সকাল 11টা - রাত 10টা</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
