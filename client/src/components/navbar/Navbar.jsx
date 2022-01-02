import React from 'react';
import './Navbar.css';
import { Button } from 'semantic-ui-react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({ setLoggedIn }) => {
  const location = useLocation();

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
          <NavLink
            to="/"
            className={
              location.pathname === '/' ? 'nav-link-active' : 'nav-link'
            }
          >
            SELL
          </NavLink>
        </li>
      </ul>
      <Button
        color="red"
        onClick={() => {
          localStorage.removeItem('auth');
          setLoggedIn(false);
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
};

export default Navbar;
