import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-green-600 mb-12 mx-auto w-max border-b-4 border-green-600 pb-2 text-center">যোগাযোগ করুন</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 inline-block pb-1">আমাদেরকে বার্তা পাঠান</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">আপনার নাম</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">ইমেইল ঠিকানা</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">আপনার বার্তা</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                    required
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            >
                                পাঠান
                            </button>
                            {success && (
                                <p className="text-green-600 font-medium mt-4">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</p>
                            )}
                        </form>
                    </div>
                    
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 inline-block pb-1">আমাদের সাথে যোগাযোগ</h3>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-map-marker-alt text-green-600 text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">ঠিকানা</h4>
                                    <p className="text-gray-600">বেইলী ব্রিজ, পাচ্চঁর, শিবচর<br />মাদারীপুর, বাংলাদেশ</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-phone-alt text-green-600 text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">ফোন নম্বর</h4>
                                    <p className="text-gray-600">+৮৮০১৬৪৮২০২৬০১</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-envelope text-green-600 text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">ইমেইল</h4>
                                    <p className="text-gray-600">khichurighorbd@gmail.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-clock text-green-600 text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">খোলার সময়</h4>
                                    <p className="text-gray-600">
                                        শুক্রবার: বন্ধ। সোমবারঃ -  সকাল ১১টা - রাত ১০টা<br />
                                        শনিবার - রবিবারঃ বিকাল ১২টা - রাত ১১টা<br />
                                        বুধবার - বৃহস্পতিবারঃ সকাল ১১টা - রাত ১০টা
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <h4 className="font-semibold text-gray-800 mb-4">আমাদের অনুসরণ করুন</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-3 rounded-full transition duration-300">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="bg-gray-100 hover:bg-blue-400 hover:text-white p-3 rounded-full transition duration-300">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="bg-gray-100 hover:bg-pink-600 hover:text-white p-3 rounded-full transition duration-300">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="bg-gray-100 hover:bg-red-600 hover:text-white p-3 rounded-full transition duration-300">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
