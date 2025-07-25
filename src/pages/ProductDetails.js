import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ProductReviews from '../components/ProductReviews';

const API_BASE_URL = 'https://khichuri-backend-api.onrender.com/api';

const ProductDetails = ({ addToCart, products = [], submitReview }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if product already set from location or props, skip fetch
    if (product) { setLoading(false); return; }
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
        };
    // Try to find in props products first
    const localProd = products.find(p => p._id === id);
    if (localProd) {
      setProduct(localProd);
      setLoading(false);
    } else {
      fetchProduct();
    }
  }, [id, products]);

  if (loading) return <div className="container mx-auto px-4 py-16">লোড হচ্ছে...</div>;
  if (error || !product) return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-red-500 mb-4">{error || 'পণ্য পাওয়া যায়নি'}</p>
      <button onClick={() => navigate(-1)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">পেছনে যান</button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <button onClick={() => navigate(-1)} className="mb-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition-transform transform hover:-translate-y-0.5">← পেছনে যান</button>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Image */}
        <div className="md:w-2/5 w-full flex justify-center">
          <img src={product.image || 'https://placehold.co/450x450/6B8E23/FFFFFF?text=Khichuri'} alt={product.name} className="w-full h-auto rounded-lg shadow-lg object-cover" />
        </div>

        {/* Info */}
        <div className="md:w-3/5 w-full flex flex-col items-start justify-around h-full space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">{product.name}</h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{product.description}</p>
          {product.discount > 0 ? (
            <div>
              <span className="text-xl md:text-2xl font-bold text-gray-500 line-through">৳{product.price}</span>
              <span className="text-2xl md:text-3xl font-bold text-yellow-600 ml-2">৳{(product.price * (1 - product.discount/100)).toFixed(2)}</span>
            </div>
          ) : (
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">৳{product.price}</p>
          )}
          <button onClick={() => addToCart(product._id,1)} className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-12 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1">অর্ডার করুন</button>
        </div>
      </div>

      {/* Recipe section */}
      {product.recipe && (
        <details className="mt-16 bg-white p-6 rounded-lg shadow-md">
          <summary className="cursor-pointer text-lg font-semibold text-green-700 hover:text-green-800 transition-colors duration-200">রেসেপি (তৈরির প্রক্রিয়া)</summary>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200" dangerouslySetInnerHTML={{__html: product.recipe}} />
        </details>
      )}

      {/* Reviews */}
      <div className="mt-16 w-full">
        <ProductReviews productId={product._id} submitReview={submitReview} />
      </div>
    </div>
  );
};

export default ProductDetails;
