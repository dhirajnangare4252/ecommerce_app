import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { clearToken, getAccessToken } from "../utils/auth";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const IsLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-6 flex justify-between items-center fixed w-full top-0 z-50">
      {/* <div className='border-2 rounded-md p-1 border-tr'><Link to="/" className="text-xl font-bold text-gray-800">E-Commerce</Link></div> */}

      <div className=" bg-sky-700 text-white border-2  rounded-tl-none rounded-br-none rounded-tr-lg rounded-bl-lg p-2">
        <Link to="/" className="text-lg font-mono">
          Shoppers Stop
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {!IsLoggedIn ? (
          <>
            <div className="border border-gray-800 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white">
              <Link to="/login" className="">
                Login
              </Link>
            </div>
            <div className="border border-gray-800 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white">
              <Link to="/register" className="">
                Register
              </Link>
            </div>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-gray-800 border border-gray-800 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white hover:text-gray-600 font-medium"
          >
            Logout
          </button>
        )}
      </div>

      <Link
        to="/cart"
        className="relative text-gray-800 hover:text-gray-600 font-medium"
      >
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
  );
}

export default Navbar;
