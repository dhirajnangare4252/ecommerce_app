import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../src/context/CartContext";

function CheckoutPage() {
  const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });

  const { loading, setLoading } = useState(false);
  const { error, setError } = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/orders/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Order Placed Successfully!");
        fetch(`${BASE_URL}/api/cart/`);
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(data.error || "Failed to place order");
      }
    } catch (error) {
      setError("An error occurred while placing the order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full  border rounded-lg p-2"
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Address"
            className="w-full  border rounded-lg p-2"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="w-full  border rounded-lg p-2"
          />
          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="w-full  border rounded-lg p-2"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="CreditCard">Online Payment</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

          {success && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center font-semibold">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
