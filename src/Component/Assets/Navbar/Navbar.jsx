import React from 'react' //6.9k (gzipped: 2.7k)
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart-icon.png'

const Navbar = () => {
    return (
        <div>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
        </div>
    )
}
export default Navbar