import React, {useState} from 'react'; //6.9k (gzipped: 2.7k)
import { Link } from 'react-router-dom';
import './Navbar.css';
import { BsShop } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";


function Navbar() {

        const[menu,setMenu] = useState("shop");
        const[toggleMenu, setToggleMenu] = useState(false);

        const closeMenu = () => setToggleMenu(false);
    return (
    <nav className="navbar">
        <div className="navbar-container">

            <div className="mobile-menu-icon" onClick={() => setToggleMenu(!toggleMenu)}>
                {toggleMenu ? <RiCloseLine color="#372414" size={30} /> : <RiMenu3Line color="#372414" size={30} />}
            </div>

            <div className="nav-logo">
                <BsShop size={40}/>
                <p>BARE THRIFT</p>
            </div>

            <ul className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link to = '/' style = {{textDecoration: 'none'}}>Shop</Link>{menu==="shop" ? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link  to = '/mens' style = {{textDecoration: 'none'}}>Men</Link>{menu==="mens" ? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link  to = '/womens' style = {{textDecoration: 'none'}}>Women</Link>{menu==="womens" ? <hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link  to = '/kids' style = {{textDecoration: 'none'}}>Kids</Link>{menu==="kids" ? <hr/>:<></>}</li>
            </ul>

            <div className="nav-login-cart">
                <Link to='/login' className="desktop-login"><button>Login</button></Link>
                <div className="cart-wrapper">
                    <Link to = '/cart'><HiOutlineShoppingBag size={35} color="#372414"/></Link>
                    <div className="nav-cart-count">0</div>
                </div>    
            </div>
        </div>

        <div className={`nav-menu-mobile ${toggleMenu ? 'active' : ''}`}>
            <div className="sidebar-close" onClick={closeMenu}>
                <RiCloseLine color="#372414" size={30} />
            </div>

            <ul className="nav-links-mobile">
                <li><Link to='/' onClick={closeMenu}>Shop</Link></li>
                <li><Link to='/mens' onClick={closeMenu}>Men</Link></li>
                <li><Link to='/womens' onClick={closeMenu}>Women</Link></li>
                <li><Link to='/kids' onClick={closeMenu}>Kids</Link></li>
                <hr />
                <li><Link to='/login' onClick={closeMenu}>Login / Account</Link></li>
            </ul>
        </div>
        {toggleMenu && <div className="menu-overlay" onClick={closeMenu}></div>}
    </nav>
    );
}

export default Navbar;