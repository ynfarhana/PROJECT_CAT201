import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutStyles.css'; 

function ShippingAddress () {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save shipping info temporarily to local storage
    localStorage.setItem('shippingInfo', JSON.stringify(formData));
    // Navigate to final payment page
    navigate('/checkout/payment');
  };

  return (
    <div className="shipping-container">
      <div className="shipping-card">
        <div className="shipping-header">
          <span className="icon">📍</span>
          <h2>Delivery Address</h2>
        </div>
        <p className="subtitle">Please provide your details for a smooth delivery</p>
        
        <form className="shipping-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          </div>

          <input type="text" name="address" placeholder="House Number, Building, Street Name" required className="full-width" onChange={handleChange} />

          <div className="input-group three-col">
            <input type="text" name="city" placeholder="City" required onChange={handleChange} />
            <input type="text" name="state" placeholder="State/Area" required onChange={handleChange} />
            <input type="text" name="zip" placeholder="Postal Code" required onChange={handleChange} />
          </div>

          <button type="submit" className="payment-btn">
            Proceed to Payment Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddress;