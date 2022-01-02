import { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/registration/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AddProduct from './pages/add-product/AddProduct';
import ProductDetails from './pages/product-details/ProductDetails';
import Products from './pages/products/Products';
import { useNavigate } from 'react-router-dom';
import {authenticate} from './auth/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    authenticate(setLoggedIn, navigate);
  }, [loggedIn]);
  
  return (
    <>
      {loggedIn && <Navbar setLoggedIn={setLoggedIn} />}
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<AddProduct />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
