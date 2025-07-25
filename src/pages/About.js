import React, { useState } from 'react';

const About = () => {
    const [expanded, setExpanded] = useState(false);
    const toggle = () => setExpanded(prev => !prev);

    return (
        <div className="container mx-auto px-4 py-16 text-center" id="about">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-green-600 mb-10 mx-auto w-max border-b-4 border-green-600 pb-2 text-center">
                আমাদের সম্পর্কে
            </h2>

            <div className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-4xl text-left">
                {expanded ? (
                    <>
                        <p className="text-gray-700 mb-4 text-lg">
                            খিচুড়ি ঘর শুরু হয়েছিল একটি সাধারণ ধারণা নিয়ে - সবার জন্য সুস্বাদু, স্বাস্থ্যকর এবং সাশ্রয়ী মূল্যের খাবার পৌঁছে দেওয়া। আমাদের লক্ষ্য হলো বাড়ির মতো স্বাদের খাবার আপনার দরজায় পৌঁছে দেওয়া।
                        </p>
                        <p className="text-gray-700 mb-6 text-lg">
                            আমরা শুধু খাবারই পরিবেশন করি না, আমরা স্মৃতি তৈরি করি। প্রতিটি পদ তৈরি হয় সততা, যত্ন এবং সেরা উপাদান দিয়ে।
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">আমাদের মূল্যবোধ</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                            <li>সর্বোচ্চ মানের উপাদান ব্যবহার</li>
                            <li>স্বাস্থ্যকর এবং পুষ্টিকর খাবার</li>
                            <li>সময়নিষ্ঠ সেবা</li>
                            <li>গ্রাহক সন্তুষ্টি নিশ্চিতকরণ</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">আমাদের গল্প</h3>
                        <p className="text-gray-700 mb-4 text-lg">
                            ২০২৩ সালে প্রতিষ্ঠিত, খিচুড়ি ঘর শুরু হয়েছিল একটি ছোট রেস্টুরেন্ট হিসেবে। আজ আমরা গর্বিতভাবে সারা দেশে হাজার হাজার সন্তুষ্ট গ্রাহকের কাছে পৌঁছাতে পেরেছি।
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">আমাদের দল</h3>
                        <p className="text-gray-700 mb-6 text-lg">
                            আমাদের দক্ষ শেফ এবং সেবাদানকারী দল সর্বদাই আপনার জন্য সেরা স্বাদ এবং সেবা নিশ্চিত করতে কাজ করে যাচ্ছে।
                        </p>
                        <div className="text-center mt-6">
                            <button onClick={toggle} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                                সংক্ষেপ করুন
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-700 mb-6 text-lg">
                            খিচুড়ি ঘর শুরু হয়েছিল একটি সাধারণ ধারণা নিয়ে - সবার জন্য সুস্বাদু, স্বাস্থ্যকর এবং সাশ্রয়ী মূল্যের খাবার পৌঁছে দেওয়া...
                        </p>
                        <div className="text-center">
                            <button onClick={toggle} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                                বিস্তারিত
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};


export default About;
