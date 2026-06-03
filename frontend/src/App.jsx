import ProductList from '../pages/ProductList';
import  { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductDetails from '../pages/ProductDetails';
import Navbar from './components/Navbar';
import CartPage from '../pages/CartPage';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} ></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;