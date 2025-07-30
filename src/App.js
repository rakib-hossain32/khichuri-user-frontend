import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProductDetails from "./pages/ProductDetails";

// Base URL for the backend API
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://khichuri-backend-api.onrender.com/api";

// Mock product data
const mockProducts = [
  {
    _id: "654f5a89d70e4c2b918f0a00",
    name: "গরুর মাংস খিচুড়ি",
    description: "সুস্বাদু গরুর মাংস এবং মশলা দিয়ে তৈরি মজাদার খিচুড়ি।",
    price: 250,
    discount: 10,
    image: "https://placehold.co/600x400/6B8E23/FFFFFF?text=Beef+Khichuri",
  },
  {
    _id: "654f5a89d70e4c2b918f0a01",
    name: "ডিম খিচুড়ি",
    description: "ডিম এবং সবজি দিয়ে তৈরি হালকা ও পুষ্টিকর খিচুড়ি।",
    price: 180,
    discount: 0,
    image: "https://placehold.co/600x400/FFD700/6B8E23?text=Egg+Khichuri",
  },
  {
    _id: "654f5a89d70e4c2b918f0a02",
    name: "নিরামিষ খিচুড়ি",
    description:
      "বিভিন্ন ধরণের তাজা সবজি দিয়ে তৈরি স্বাস্থ্যকর নিরামিষ খিচুড়ি।",
    price: 200,
    discount: 5,
    image: "https://placehold.co/600x400/FDF9F3/6B8E23?text=Veg+Khichuri",
  },
  {
    _id: "654f5a89d70e4c2b918f0a03",
    name: "মুরগির মাংস খিচুড়ি",
    description: "দেশি মুরগির মাংসের অসাধারণ স্বাদে ভরপুর এই খিচুড়ি।",
    price: 220,
    discount: 0,
    image: "https://placehold.co/600x400/6B8E23/FFFFFF?text=Chicken+Khichuri",
  },
  {
    _id: "654f5a89d70e4c2b918f0a04",
    name: "ভুনা খিচুড়ি",
    description: "বিশেষ মশলা এবং কৌশলে তৈরি ভুনা খিচুড়ি।",
    price: 230,
    discount: 8,
    image: "https://placehold.co/600x400/FFD700/6B8E23?text=Bhuna+Khichuri",
  },
  {
    _id: "654f5a89d70e4c2b918f0a05",
    name: "মশলা খিচুড়ি",
    description: "একদম গরম গরম এবং মশলাদার খিচুড়ি।",
    price: 190,
    discount: 0,
    image: "https://placehold.co/600x400/FDF9F3/6B8E23?text=Spicy+Khichuri",
  },
];

const App = () => {
  const [products, setProducts] = useState(mockProducts);
  const [cart, setCart] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("info");
  const [reviews, setReviews] = useState({});
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Show notification message
  const showCustomMessage = useCallback((message, type = "info") => {
    setNotification(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  // Add item to cart
  const addToCart = useCallback(
    (productId, quantity = 1) => {
      const product = products.find((p) => p._id === productId);
      if (!product) {
        showCustomMessage("Product not found", "error");
        return;
      }

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === productId);
        if (existingItem) {
          return prevCart.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...product, quantity }];
      });

      showCustomMessage("পণ্যটি কার্ডে যোগ হয়েছে", "success");
    },
    [products, showCustomMessage]
  );

  // Remove item from cart
  const removeFromCart = useCallback(
    (productId) => {
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
      showCustomMessage("Product removed from cart", "info");
    },
    [showCustomMessage]
  );

  // Update item quantity in cart
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  // Calculate cart total
  const calculateCartTotal = useCallback(() => {
    return cart
      .reduce((total, item) => {
        const price = item.price * (1 - (item.discount || 0) / 100);
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  }, [cart]);

  // Handle order submission
  const handleOrderSubmit = async (orderData) => {
    try {
      const orderDetails = {
        ...orderData,
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price * (1 - (item.discount || 0) / 100),
        })),
        total: calculateCartTotal(),
        orderDate: new Date().toISOString(),
        orderNumber: "ORD-" + Date.now().toString().slice(-6).toUpperCase(),
        status: "pending",
      };

      // Log order details to console (for testing)
      console.log("Order Details:", {
        orderNumber: orderDetails.orderNumber,
        customer: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        items: orderDetails.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: (item.price * item.quantity).toFixed(2),
        })),
        subtotal: orderDetails.total,
        paymentMethod: orderData.paymentMethod || "cod",
        status: orderDetails.status,
        orderDate: new Date().toLocaleString("bn-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      // Send order confirmation email (simulated)
      console.log("Sending order confirmation to:", orderData.phone);
      console.log("Order Summary:", {
        orderNumber: orderDetails.orderNumber,
        customer: orderData.name,
        total: orderDetails.total,
        itemCount: orderDetails.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
      });

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const orderNumber =
        "ORD-" + Date.now().toString().slice(-6).toUpperCase();

      // Show success message with order number
      showCustomMessage(
        `অর্ডার #${orderNumber} সফলভাবে দেওয়া হয়েছে!`,
        "success"
      );

      // Navigate to order confirmation page with order details
      navigate("/order-confirmation", {
        state: {
          orderDetails: {
            ...orderDetails,
            orderNumber,
            name: orderData.name,
            phone: orderData.phone,
            address: orderData.address,
            paymentMethod: orderData.paymentMethod || "cod",
            items: orderDetails.items.map((item) => ({
              ...item,
              image: cart.find((p) => p._id === item.productId)?.image,
            })),
          },
        },
      });

      // Clear cart after successful order
      setCart([]);
      return true;
    } catch (error) {
      console.error("Error placing order:", error);
      showCustomMessage(error.message || "Failed to place order", "error");
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      showCustomMessage("Message sent successfully!", "success");
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      showCustomMessage("Failed to send message", "error");
      return false;
    }
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Submit review for a product
  const submitReview = async (productId, reviewData) => {
    try {
      console.log("Submitting review for product:", productId, reviewData);
      const payload = {
        author: reviewData.name,
        rating: parseInt(reviewData.rating, 10),
        comment: reviewData.comment,
        date: new Date().toISOString(),
      };

      console.log("Sending review payload:", payload);

      const response = await fetch(
        `${API_BASE_URL}/products/${productId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      console.log("Review submission response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Review submission failed:", errorData);
        throw new Error(errorData.message || "Failed to submit review");
      }

      const newReview = await response.json();
      console.log("Review submitted successfully:", newReview);

      // Update the reviews state
      setReviews((prev) => ({
        ...prev,
        [productId]: [newReview, ...(prev[productId] || [])], // Add new review at the beginning
      }));

      showCustomMessage("রিভিউ সাবমিট করা হয়েছে!", "success");
      return true;
    } catch (error) {
      console.error("Error submitting review:", error);
      showCustomMessage(
        error.message || "রিভিউ সাবমিট করতে সমস্যা হয়েছে",
        "error"
      );
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col relative z-content">
      {/* Modern Header */}
      <Header cart={cart} setIsCartModalOpen={setIsCartModalOpen} />

      {/* Modern Main Content */}
      <main className="flex-grow relative z-content">
        <Routes>
          <Route
            path="/"
            element={<Home products={products} addToCart={addToCart} />}
          />

          <Route
            path="/menu"
            element={
              <Menu products={products} addToCart={addToCart} showBack />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                addToCart={addToCart}
                products={products}
                submitReview={submitReview}
              />
            }
          />

          <Route path="/about" element={<About />} />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                total={calculateCartTotal()}
                submitOrder={handleOrderSubmit}
              />
            }
          />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route
            path="/contact"
            element={<Contact onSubmit={handleContactSubmit} />}
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Page Not Found
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  The page you're looking for doesn't exist.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Back to Home
                </button>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Modern Footer */}
      <Footer />

      {/* Modern Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        calculateCartTotal={calculateCartTotal}
        onOrderSubmit={handleOrderSubmit}
      />

      {/* Modern Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`notification-modern p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 ${
            notificationType === "error"
              ? "bg-gradient-to-r from-red-500 to-red-600"
              : notificationType === "success"
              ? "bg-gradient-to-r from-green-500 to-green-600"
              : "bg-gradient-to-r from-blue-500 to-blue-600"
          } text-white font-semibold`}
        >
          <div className="flex items-center">
            <i
              className={`fas ${
                notificationType === "error"
                  ? "fa-exclamation-triangle"
                  : notificationType === "success"
                  ? "fa-check-circle"
                  : "fa-info-circle"
              } mr-3 text-xl`}
            ></i>
            <span>{notification}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;
