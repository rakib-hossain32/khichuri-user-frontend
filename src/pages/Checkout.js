import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart = [], total = 0, submitOrder }) => {
  // Ensure cart is always an array to prevent map errors
  const safeCart = Array.isArray(cart) ? cart : [];
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    payment: "cod",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields including email
    if (!form.name || !form.phone || !form.address || !form.email) {
      return alert(
        "দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন (নাম, ফোন, ঠিকানা এবং ইমেইল আবশ্যক)"
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return alert("দয়া করে একটি বৈধ ইমেইল ঠিকানা দিন");
    }

    setIsSubmitting(true);
    try {
      const orderNumber =
        "ORD-" + Date.now().toString().slice(-6).toUpperCase();
      const orderData = {
        ...form,
        customerName: form.name, // Ensure customerName is set
        customerData: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          email: form.email || "no-email@example.com",
        }),
        paymentMethod: form.payment,
        orderNumber,
      };

      console.log("Submitting order:", orderData);
      await submitOrder(orderData);

      // Navigate directly to order confirmation without showing alert
      navigate("/order-confirmation", {
        state: {
          orderDetails: {
            orderNumber,
            name: form.name,
            phone: form.phone,
            address: form.address,
            paymentMethod: form.payment || "cod",
            items: safeCart.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })),
            total: total,
            orderDate: new Date().toISOString(),
            status: "pending",
          },
        },
      });
    } catch (error) {
      console.error("অর্ডার জমা দিতে সমস্যা হয়েছে:", error);
      alert("দুঃখিত, অর্ডার জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (safeCart.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl">
          <div className="mb-4 text-6xl text-gray-300">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            আপনার কার্ড খালি
          </h2>
          <p className="mb-6 text-gray-600">
            অর্ডার করতে প্রথমে কিছু আইটেম কার্ডে যোগ করুন
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 font-bold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
          >
            <i className="mr-2 fas fa-home"></i> হোমপেজে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">অর্ডার সম্পূর্ণ করুন</span>
            <span className="block mt-2 text-xl text-green-600">
              আপনার পছন্দের খাবারটি আপনার দরজায়
            </span>
          </h1>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="p-6 sm:p-8">
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                আপনার অর্ডার
              </h3>
              <div className="overflow-hidden bg-white rounded-lg shadow">
                {safeCart.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    আপনার কার্ডে কোনো আইটেম নেই
                  </div>
                ) : (
                  safeCart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-b border-gray-100"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            item.image ||
                            "https://placehold.co/80x80/6B8E23/FFFFFF?text=Khichuri"
                          }
                          alt={item.name}
                          className="object-cover w-16 h-16 mr-4 rounded-lg"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            পরিমাণ: {item.quantity} × ৳{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="pb-2 mt-8 mb-4 text-xl font-bold text-gray-800 border-b-2 border-green-100">
                  <i className="mr-2 text-green-500 fas fa-truck"></i> ডেলিভারি
                  তথ্য
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
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

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
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
                      <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
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
                    <label
                      htmlFor="address"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
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
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  পেমেন্ট পদ্ধতি
                </h3>
                <div className="mb-6 space-y-3">
                  <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={form.payment === "cod"}
                      onChange={handleChange}
                      className="w-5 h-5 mt-1 text-green-500 border-gray-300 focus:ring-green-400"
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">
                        ক্যাশ অন ডেলিভারি (COD)
                      </span>
                      <span className="block text-sm text-gray-500">
                        ডেলিভারি সময়ে নগদে পেমেন্ট করুন
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="bkash"
                      checked={form.payment === "bkash"}
                      onChange={handleChange}
                      className="w-5 h-5 mt-1 text-green-500 border-gray-300 focus:ring-green-400"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="block mr-2 text-sm font-medium text-gray-700">
                          বিকাশ
                        </span>
                        <img
                          src="https://seeklogo.com/images/B/bkash-logo-FD5593F6EB-seeklogo.com.png"
                          alt="bKash"
                          className="h-5"
                        />
                      </div>
                      <span className="block mt-1 text-sm text-gray-500">
                        বিকাশ নম্বর: ০১২৩৪৫৬৭৮৯(পারসোনাল)
                      </span>
                      {form.payment === "bkash" && (
                        <div className="p-3 mt-2 border border-yellow-200 rounded-md bg-yellow-50">
                          <p className="text-sm text-yellow-700">
                            অনুগ্রহ করে বিকাশে পেমেন্ট করে নিচের তথ্যগুলো দিন:
                          </p>
                          <p className="mt-1 text-sm font-medium">
                            বিকাশ নম্বর:{" "}
                            <span className="text-green-600">০১২৩৪৫৬৭৮৯</span>
                          </p>
                          <p className="text-sm font-medium">
                            রেফারেন্স:{" "}
                            <span className="text-green-600">
                              ORD{Date.now().toString().slice(-6)}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </label>

                  <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="nagad"
                      checked={form.payment === "nagad"}
                      onChange={handleChange}
                      className="w-5 h-5 mt-1 text-green-500 border-gray-300 focus:ring-green-400"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="block mr-2 text-sm font-medium text-gray-700">
                          নগদ
                        </span>
                        <img
                          src="https://seeklogo.com/images/N/nagad-logo-9C3E1A0C2A-seeklogo.com.png"
                          alt="Nagad"
                          className="h-5"
                        />
                      </div>
                      <span className="block mt-1 text-sm text-gray-500">
                        নগদ নম্বর: ০১২৩৪৫৬৭৮৯ (পারসোনাল)
                      </span>
                      {form.payment === "nagad" && (
                        <div className="p-3 mt-2 border border-yellow-200 rounded-md bg-yellow-50">
                          <p className="text-sm text-yellow-700">
                            অনুগ্রহ করে নগদে পেমেন্ট করে নিচের তথ্যগুলো দিন:
                          </p>
                          <p className="mt-1 text-sm font-medium">
                            নগদ নম্বর:{" "}
                            <span className="text-green-600">০১২৩৪৫৬৭৮৯</span>
                          </p>
                          <p className="text-sm font-medium">
                            রেফারেন্স:{" "}
                            <span className="text-green-600">
                              ORD{Date.now().toString().slice(-6)}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full px-6 py-4 font-bold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      অর্ডার দেওয়া হচ্ছে...
                    </>
                  ) : (
                    <>
                      <i className="mr-2 fas fa-check-circle"></i> অর্ডার
                      নিশ্চিত করুন
                    </>
                  )}
                </button>

                {/* Cancel / Go Back Button */}
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex items-center justify-center w-full px-6 py-3 mt-3 font-bold text-gray-700 transition duration-300 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  <i className="mr-2 fas fa-arrow-left"></i> পরে অর্ডার করবেন
                </button>

                <p className="mt-3 text-sm text-center text-gray-500">
                  অর্ডার দিয়ে আপনি আমাদের{" "}
                  <a href="#" className="text-green-600 hover:underline">
                    সার্ভিস শর্তাবলী
                  </a>{" "}
                  এবং{" "}
                  <a href="#" className="text-green-600 hover:underline">
                    গোপনীয়তা নীতি
                  </a>{" "}
                  মেনে নিচ্ছেন
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-sm text-center text-gray-500">
          <p>
            কোনো সমস্যায় কল করুন:{" "}
            <a
              href="tel:+০১২৩৪৫৬৭৮৯ "
              className="text-green-600 hover:underline"
            >
              +88০১২৩৪৫৬৭৮৯
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
