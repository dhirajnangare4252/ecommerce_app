import { useState, useEffect } from 'react';
import ProductCard from '../src/components/ProductCard';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const VITE_DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(() => {
        fetch(`${VITE_DJANGO_BASE_URL}/api/products/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 mt-18">
            <h1 className="text-3xl font-bold text-center py-6">Products List</h1>
            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">No products found.</div>
                )}
            </div>
        </div>
    );
}

export default ProductList;

