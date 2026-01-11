import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState('idle');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart'); 
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Removed hardcoded demo items so it starts empty as requested
      setCartItems([]); 
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      // Sending the alphanumeric ID (e.g., 'k001') to the Servlet
      await fetch(`/api/cart?action=remove&id=${id}`, { method: 'POST' });
      
      // Update UI: Decrease quantity or remove if it was the last one
      setCartItems(prev => prev.map(item => {
        if (item.productId === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleProceedToCheckout = () => {
    setOrderStatus('loading'); // Use the state here!
    navigate('/checkout/shipping'); 
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;

  return (
    <div className="cart-page">
      {/* Keeping the toast here in case you return to cart after an error */}
      {orderStatus === 'success' && (
        <div className="notification success-toast">🎉 Proceeding to Checkout...</div>
      )}
      
      <div className="cart-header">
        <h1>YOUR SHOPPING BAG</h1>
        <p>{cartItems.length} Unique Items</p>
      </div>

      <div className="cart-content">
        <div className="cart-items-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId} className="cart-item-card">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">RM{item.price.toFixed(2)}</p>
                  <p className="item-qty">Quantity: {item.quantity}</p>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.productId)}>
                  {item.quantity > 1 ? 'REDUCE' : 'REMOVE'}
                </button>
              </div>
            ))
          ) : (
            <div className="empty-cart-container">
              <div className="empty-cart-icon">🛍️</div>
              <h2>Your bag is currently empty</h2>
              <p>Looks like you haven't discovered any vintage gems yet!</p>
              <button 
                className="return-shop-btn" 
                onClick={() => window.location.href = '/'}
              >
                START THRIFTING
              </button>
            </div>
          )}
        </div>

        <div className="order-summary-card">
          <h2>ORDER SUMMARY</h2>
          <div className="summary-row"><span>Subtotal</span><span>RM{subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>RM{shipping.toFixed(2)}</span></div>
          <hr />
          <div className="summary-row total"><span>TOTAL</span><span>RM{total.toFixed(2)}</span></div>
          
          {/* CHANGED: Button text is now CHECKOUT and leads to shipping form */}
          <button 
            className="checkout-action-btn"
            disabled={cartItems.length === 0}
            onClick={handleProceedToCheckout} 
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;