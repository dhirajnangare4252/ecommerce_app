import ProductList from '../pages/ProductList';
import  { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductDetails from '../pages/ProductDetails';
import Navbar from './components/Navbar';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} ></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;