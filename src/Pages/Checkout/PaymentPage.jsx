import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
    const navigate = useNavigate(); 
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');
    
    // Combo State
    const [isComboAdded, setIsComboAdded] = useState(false);
    const comboPrice = 15.00;
    
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};

    useEffect(() => {
        fetch('/api/cart').then(res => res.json()).then(data => setCartItems(data));
    }, []);

    // Dynamic Calculations
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 5.00;
    const total = subtotal + shipping + (isComboAdded ? comboPrice : 0);

    const handlePlaceOrder = () => {
        console.log("Order Placed via:", paymentMethod, "Message:", orderMessage);
        setShowSuccess(true);
        localStorage.removeItem('shippingInfo');
        
        setTimeout(() => {
            navigate('/'); 
        }, 5000); 
    };

    return (
        <div className="checkout-wrapper">
            <div className="main-content">
                {/* 1. Delivery Summary Area */}
                <div className="info-card">
                    <h3 className="section-header">📍 Delivery Address</h3>
                    <div className="address-box">
                        <strong>{shippingInfo.fullName} | {shippingInfo.phone}</strong>
                        <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                    </div>
                </div>

                {/* 2. Message to Admin Section */}
                <div className="info-card message-card fade-in">
                    <h3 className="section-header">📝 Note for Admin</h3>
                    <div className="message-input-wrapper">
                        <textarea 
                            className="admin-message-input" 
                            placeholder="E.g. Please wrap as a gift, or leave at the front door..."
                            value={orderMessage}
                            onChange={(e) => setOrderMessage(e.target.value)}
                            maxLength="200"
                        ></textarea>
                        <div className="char-count">{orderMessage.length}/200</div>
                    </div>
                </div>

                {/* 2. Payment Dropdown */}
                <div className="info-card">
                    <h3 className="section-header">💳 Payment Method</h3>
                    <select 
                        className="payment-dropdown" 
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="" disabled>Select how you want to pay</option>
                        <option value="online">Online Banking (FPX)</option>
                        <option value="cod">Cash on Delivery (COD)</option>
                        <option value="store">Pay at Physical Store (7-Eleven/KK Mart)</option>
                        <option value="card">Credit / Debit Card</option>
                    </select>

                    {paymentMethod === 'online' && (
                        <div className="bank-selection-area fade-in">
                            <p className="sub-label">Choose your bank:</p>
                            <div className="bank-grid">
                                {['Maybank2u', 'CIMB Clicks', 'Public Bank', 'RHB Now'].map(bank => (
                                    <button 
                                        key={bank}
                                        className={`bank-item ${selectedBank === bank ? 'active' : ''}`}
                                        onClick={() => setSelectedBank(bank)}
                                    >
                                        {bank}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. NEW: Interactive Combo Section */}
                <div className={`combo-section fade-in ${isComboAdded ? 'selected' : ''}`}>
                    <div className="combo-header">
                        <span className="sparkle">✨</span> Limited Time Offer
                    </div>
                    <div className="combo-card">
                        <div className="combo-info">
                            <h4>Thrift Care Kit</h4>
                            <p>Fabric shaver & vintage detergent</p>
                            <span className="combo-price-tag">RM15.00 <del>RM25.00</del></span>
                        </div>
                        <button 
                            className={`add-combo-btn ${isComboAdded ? 'remove' : ''}`} 
                            onClick={() => setIsComboAdded(!isComboAdded)}
                        >
                            {isComboAdded ? 'REMOVE' : '+ ADD'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar Summary */}
            <div className="sidebar">
                <div className="order-card">
                    <h3>Order Summary</h3>
                    <div className="summary-line"><span>Subtotal</span><span>RM{subtotal.toFixed(2)}</span></div>
                    <div className="summary-line"><span>Shipping</span><span>RM{shipping.toFixed(2)}</span></div>
                    {isComboAdded && (
                        <div className="summary-line combo-line fade-in">
                            <span>Thrift Care Kit</span>
                            <span>RM{comboPrice.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="divider"></div>
                    <div className="summary-line total-line">
                        <span>Total Payment</span>
                        <span className={`highlight-price ${isComboAdded ? 'pulse' : ''}`}>
                            RM{total.toFixed(2)}
                        </span>
                    </div>
                    <button 
                        className="confirm-order-btn" 
                        disabled={!paymentMethod}
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon">🎉</div>
                        <h2>Order Placed Successfully!</h2>
                        <p>Thank you for thrifting with <strong>BARE THRIFT</strong>. Your vintage gems are being prepared!</p>
                        <div className="modal-buttons">
                            <button className="continue-btn" onClick={() => navigate('/')}>
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;