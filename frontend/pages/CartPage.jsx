import { useCart } from "../src/context/CartContext";


function CartPage() {
    const { cartItems,total, removeFromCart, updateQuantity } = useCart();

    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    console.log(cartItems);

    return (
        <div className="min-h-screen bg-gray-100 py-10 mt-6">
            <h1 className="text-3xl font-bold text-center my-8">Your Cart</h1>
            {
                cartItems.length === 0 ? (
                    <p className="text-center text-gray-600">Your cart is empty.</p>
                ) : (   
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
                                <div>
                                    <div className = "flex items-center gap-4">
                                        {
                                            item.product_image &&(
                                                <img 
                                                src={`${BASE_URL}${item.product_image}`}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded"
                                                 />
                                            )
                                        }
                                    </div>
                                    <h2 className="text-lg font-semibold">{item.product_name}</h2>
                                    <p className="text-gray-600">${item.product_price}</p>
                                </div>
                                <div className="flex items-center gap-4">

                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-300 px-2 py-1 rounded">-</button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-300 px-2 py-1 rounded">+</button>
                                    <button onClick={() => removeFromCart(item.id)} className="bg-red-500 px-2 py-1 rounded text-white ml-4">Remove</button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center mt-4 border-t pt-4">
                            <h2 className="text-xl font-bold">Total</h2>
                            <p className="text-xl font-bold">${total.toFixed(2)}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CartPage;

