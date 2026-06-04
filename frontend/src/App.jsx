import ProductList from '../pages/ProductList';
import  { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductDetails from '../pages/ProductDetails';
import Navbar from './components/Navbar';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import PrivateRouter from './components/PrivateRouter';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} ></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route element={<PrivateRouter />}>
            <Route path="/checkout" element={<CheckoutPage />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
      </Routes>
    </Router>
  )
}

export default App;