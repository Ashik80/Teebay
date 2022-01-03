import React, { useContext } from 'react';
import './Navbar.css';
import { Button } from 'semantic-ui-react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProductStoreContext } from '../../stores/productStore';
import { observer } from 'mobx-react-lite';

const Navbar = ({ setLoggedIn }) => {
  const { clearAllProducts } = useContext(ProductStoreContext);
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
        <li>
          <NavLink
            to="/log"
            className={
              location.pathname === '/log' ? 'nav-link-active' : 'nav-link'
            }
          >
            LOG
          </NavLink>
        </li>
      </ul>
      <Button
        color="red"
        onClick={() => {
          clearAllProducts();
          localStorage.removeItem('auth');
          setLoggedIn(false);
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
};

export default observer(Navbar);
