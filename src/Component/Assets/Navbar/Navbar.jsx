import React from 'react' //6.9k (gzipped: 2.7k)
import './Navbar.css'
import { BsShop } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
//import logo from '../Assets/logo.png'
//import cart_icon from '../Assets/cart-icon.png'

const Navbar = () => {
    return (
    <div className="navbar">
        <div className="nav-logo">
            <BsShop size={50}/>
            <p>SHOPPER</p>
        </div>

        <ul className="nav-menu">
            <li>Shop <hr/></li>
            <li>Men</li>
            <li>Woman</li>
            <li>Kids</li>
        </ul>

        <div className="nav-login-cart">
            <button>Login</button>
            <HiOutlineShoppingBag size={30}/>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
    );
}

export default Navbar