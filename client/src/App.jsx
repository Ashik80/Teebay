import { useState } from 'react';
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/registration/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AddProduct from './pages/add-product/AddProduct';
import ProductDetails from './pages/product-details/ProductDetails';
import Products from './pages/products/Products';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <>
      {loggedIn && <Navbar logout={() => setLoggedIn(false)} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product-details" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
