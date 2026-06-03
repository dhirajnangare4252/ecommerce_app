import {Link} from 'react-router-dom';

function ProductCard({ product }) {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    return (
        <Link to={`/product/${product.id}`} className="bg-white p-4 shadow-md rounded-xl hover:shadow-lg transition-transform hover:scale[1.02] cursor-pointer">
        <div className="bg-white p-4 transition-transform">
            <img 
                src={`${BASE_URL}${product.image}`} 
                alt={product.name}
                className="w-full h-56 object-cover rounded-t-xl mb-4"
                 />
                 <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                 <p className="text-gray-600 font-medium">${product.price}</p>
        </div>
        </Link>
    )
}
export default ProductCard;