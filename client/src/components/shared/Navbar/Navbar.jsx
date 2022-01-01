import React from 'react'
import './Navbar.css'
import { Button } from 'semantic-ui-react'

const Navbar = () => {
    return (
        <div className='navbar'>
            <ul className='nav-list'>
                <li>BUY</li>
                <li>SELL</li>
            </ul>
            <Button color='red'>LOGOUT</Button>
        </div>
    )
}

export default Navbar
