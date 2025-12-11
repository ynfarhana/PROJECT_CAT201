import React, {useState} from 'react'; //6.9k (gzipped: 2.7k)
import { Link } from 'react-router-dom';
import './Navbar.css';
import { BsShop } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";


const Navbar = () => {

        const[menu,setMenu] = useState("shop");

    return (
    <div className="navbar">
        <div className="nav-logo">
            <BsShop size={50}/>
            <p>SHOPPER</p>
        </div>

        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link to = '/' style = {{textDecoration: 'none'}}>Shop</Link>{menu==="shop" ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link  to = '/mens' style = {{textDecoration: 'none'}}>Men</Link>{menu==="mens" ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womans")}}><Link  to = '/womans' style = {{textDecoration: 'none'}}>Woman</Link>{menu==="womans" ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link  to = '/kids' style = {{textDecoration: 'none'}}>Kids</Link>{menu==="kids" ? <hr/>:<></>}</li>
        </ul>

        <div className="nav-login-cart">
            <Link to = '/login'><button>Login</button></Link>
            <Link to = '/cart'><HiOutlineShoppingBag size={30}/></Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
    );
}

export default Navbar