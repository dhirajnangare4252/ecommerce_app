import {Link} from 'react-router-dom';
import {useCart} from '../context/CartContext';

function Navbar() {
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return(
        <nav className="bg-white shadow-md px-6 py-6 flex justify-between items-center fixed w-full top-0 z-50">
            <Link to="/" className="text-2xl font-bold text-gray-800">E-Commerce</Link>
            <Link to="/cart" className="relative text-gray-800 hover:text-gray-600 font-medium">
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                        {cartCount}
                    </span>
                )}
                <div className="flex items-center gap-2">
                    <i className="fas fa-shopping-cart">Cart</i>
                </div>
            </Link>
        </nav>
    )
}

export default Navbar;