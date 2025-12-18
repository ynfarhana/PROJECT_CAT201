import React from "react";
import './Footer.css';

function Footer (){
    return(
        <div className="footer">
            <div className="footer-top">

                {/*brand and newsletter section */}
                <div className="footer-brand">
                    <h1>THRIFT STORE</h1>
                    <p>The seamless pre-loved marketplace.</p>

                    <div className="signup-container">
                        <h3>SIGN UP FOR 15% OFF</h3>
                        <p>Plus get early access to sales, drops and edits.</p>

                        <div className="email-input-group">
                            <input type="email" placeholder="Your email" />
                            <button type="button">SIGN UP</button>
                        </div>
                    </div>
                </div>

                {/*Navigation Links Columns */}
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>SHOP</h4>
                        <ul>
                            <li>Shop Woman</li>
                            <li>Shop Men</li>
                            <li>Gift Card</li>
                            <li>Clearance</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>CLEAROUT</h4>
                        <ul>
                            <li>Clear Out</li>
                            <li>Return Bag</li>
                            <li>Our Fees</li>
                            <li>Brand Checker</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>SUPPORT</h4>
                        <ul>
                            <li>Help</li>
                            <li>Contact Us</li>
                            <li>Return An Order</li>
                            <li>Refund policy</li>
                            <li>Shipping Policy</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>©2026 Thrift Trading Ltd</p>
                <div className="legal-links">
                    <span>Privacy Policy</span>
                    <span>Terms Of Service</span>
                    <span>Update Cookie consent</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;