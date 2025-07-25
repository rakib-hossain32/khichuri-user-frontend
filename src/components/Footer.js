import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-6 text-center rounded-t-xl shadow-inner mt-12">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center space-x-6 mb-4 text-md">
                    <Link to="/sitemap" className="hover:text-green-400 transition duration-300">সাইট ম্যাপ</Link>
                    <Link to="/terms" className="hover:text-green-400 transition duration-300">টার্মস</Link>
                    <Link to="/privacy" className="hover:text-green-400 transition duration-300">প্রাইভেসি পলিসি</Link>
                </div>
                <p>&copy; {new Date().getFullYear()} খিচুড়ি ঘর। সর্বস্বত্ব সংরক্ষিত।</p>
            </div>
        </footer>
    );
};

export default Footer;
