import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../src/context/CartContext';
function ProductDetails() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${BASE_URL}/api/products/${id}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setProduct(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [id, BASE_URL]);
    

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }    

    if (error) {
        return <div className="text-center mt-10">Error: {error}</div>;
    }

    const handleAddToCart = () => {
        if(!localStorage.getItem('access_token')) {
            window.location.href = '/login';
            return;
        }
        addToCart(product.id);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
           <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <img 
                    src={`${product.image}`} 
                    alt={product.name} 
                    className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                    <p className="text-gray-600  mb-4">{product.description}</p>
                    <p className="text-green-600 text-2xl mb-6 font-semibold ">${product.price}</p>
                    <button onClick={handleAddToCart} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Add to Cart</button>
                     <div className="mt-4">
                        <a href="/" className="text-blue-500 hover:underline">&larr; Back to Home</a>
                     </div>
                </div>
            </div>
           </div>
        </div>
    );
}

export default ProductDetails;