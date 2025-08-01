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
        <div className="container px-4 py-8 mx-auto">
            <div className="p-8 mb-12 bg-white rounded-lg shadow-md">
                <h2 className="pb-2 mx-auto mb-12 text-4xl font-extrabold text-center text-green-600 border-b-4 border-green-600 lg:text-5xl w-max">যোগাযোগ করুন</h2>
                
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {/* Contact Form */}
                    <div>
                        <h3 className="inline-block pb-1 mb-6 text-2xl font-bold text-gray-900 border-b-2 border-green-500 lg:text-3xl">আমাদেরকে বার্তা পাঠান</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 font-medium text-gray-700">আপনার নাম</label>
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
                                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">ইমেইল ঠিকানা</label>
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
                                <label htmlFor="message" className="block mb-2 font-medium text-gray-700">আপনার বার্তা</label>
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
                                className="px-6 py-3 font-bold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
                            >
                                পাঠান
                            </button>
                            {success && (
                                <p className="mt-4 font-medium text-green-600">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</p>
                            )}
                        </form>
                    </div>
                    
                    {/* Contact Information */}
                    <div>
                        <h3 className="inline-block pb-1 mb-6 text-2xl font-bold text-gray-900 border-b-2 border-green-500 lg:text-3xl">আমাদের সাথে যোগাযোগ</h3>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="p-3 mr-4 bg-green-100 rounded-full">
                                    <i className="text-xl text-green-600 fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">ঠিকানা</h4>
                                    <p className="text-gray-600">বেইলী ব্রিজ, পাচ্চঁর, শিবচর<br />মাদারীপুর, বাংলাদেশ</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="p-3 mr-4 bg-green-100 rounded-full">
                                    <i className="text-xl text-green-600 fas fa-phone-alt"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">ফোন নম্বর</h4>
                                    <p className="text-gray-600">+৮৮০১৬৪৮২০২৬০১</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="p-3 mr-4 bg-green-100 rounded-full">
                                    <i className="text-xl text-green-600 fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">ইমেইল</h4>
                                    <p className="text-gray-600">khichurighorbd@gmail.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="p-3 mr-4 bg-green-100 rounded-full">
                                    <i className="text-xl text-green-600 fas fa-clock"></i>
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
                            <h4 className="mb-4 font-semibold text-gray-800">আমাদের অনুসরণ করুন</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="p-3 transition duration-300 bg-gray-100 rounded-full hover:bg-green-500 hover:text-white">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="p-3 transition duration-300 bg-gray-100 rounded-full hover:bg-blue-400 hover:text-white">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="p-3 transition duration-300 bg-gray-100 rounded-full hover:bg-pink-600 hover:text-white">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="p-3 transition duration-300 bg-gray-100 rounded-full hover:bg-red-600 hover:text-white">
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