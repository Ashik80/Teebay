import './App.css';
import Login from './components/login/Login';
import Signup from './components/registration/Signup';
import Dashboard from './components/dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* <Signup /> */}
    </>
  );
}

export default App;
