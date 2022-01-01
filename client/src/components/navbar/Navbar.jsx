import React from 'react'
import './Navbar.css'
import { Button } from 'semantic-ui-react'

const Navbar = ({logout}) => {
    return (
        <div className='navbar'>
            <ul className='nav-list'>
                <li>BUY</li>
                <li>SELL</li>
            </ul>
            <Button color='red' onClick={logout}>LOGOUT</Button>
        </div>
    )
}

export default Navbar
