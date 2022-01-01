import React from 'react';
import './Navbar.css';
import { Button } from 'semantic-ui-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = ({ logout }) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, []);
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/products"
            className={
              location.pathname === '/products' ? 'nav-link-active' : 'nav-link'
            }
          >
            BUY
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={
              location.pathname === '/' ? 'nav-link-active' : 'nav-link'
            }>
            SELL
          </NavLink>
        </li>
      </ul>
      <Button color="red" onClick={logout}>
        LOGOUT
      </Button>
    </div>
  );
};

export default Navbar;
