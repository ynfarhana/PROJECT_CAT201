import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { storage } from "../firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AdminDashboard() {
    const navigate = useNavigate();
    
    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState("inventory"); // "inventory" or "orders"
    const [productDetails, setProductDetails] = useState({
        name: "", category: "Women", subCategory: "Top", price: "", stock: "" , image: "", description: ""
    });
    const [allProducts, setAllProducts] = useState([]);
    const [allOrders, setAllOrders] = useState([]); // <--- NEW: Store Orders
    const [imageUpload, setImageUpload] = useState(null); 

    // --- INITIAL LOAD ---
    useEffect(() => {
        const role = localStorage.getItem('user-role');
        if (role !== 'admin') {
            navigate('/login');
        } else {
            fetchProducts();
            fetchOrders(); // <--- Load orders too
        }
    }, [navigate]);

    // === INVENTORY FUNCTIONS ===
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/product');
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value});
    }

    const addProduct = async () => {
        let finalImageUrl = productDetails.image;
        if (imageUpload) {
            finalImageUrl = await uploadImage();
            if (!finalImageUrl) return;
        }
        let productToSend = { ...productDetails, image: finalImageUrl };

        try {
           const response = await fetch('http://localhost:8080/api/admin/product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToSend),
            });
            const data = await response.json();
            if (data.status === 'success') {
                alert("Added!");
                setProductDetails({name: "", category: "Women", subCategory: "Top", price: "", stock: "", image: "", description: ""});
                setImageUpload(null); 
                fetchProducts();
            } else {
                alert("Failed: " + data.message);
            }
        } catch (error) {
            alert("Connection Failed");
        }
    }

    const deleteProduct = async (name) => {
        if (!window.confirm("Delete " + name + "?")) return;
        try {
            await fetch(`http://localhost:8080/api/admin/product?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
            fetchProducts(); 
        } catch (error) {
            alert("Connection Failed");
        }
    }

    const uploadImage = async () => {
        if (!imageUpload) return null;
        const imageRef = ref(storage, `images/${imageUpload.name + Date.now()}`);
        try {
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            return url;
        } catch (error) {
            alert("Image upload failed!");
            return null;
        }
    };

    // === NEW: ORDER FUNCTIONS ===
    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/admin/orders');
            const data = await response.json();
            setAllOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            // Call the Servlet to update Firebase
            const response = await fetch(`/api/admin/orders?orderId=${orderId}&status=${newStatus}`, {
                method: 'POST'
            });
            const data = await response.json();
            if (data.success) {
                alert("Order Status Updated to: " + newStatus);
                fetchOrders(); // Refresh table
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>👑 Admin Dashboard</h1>
                <button className="logout-btn" onClick={() => {
                    localStorage.removeItem('user-role');
                    navigate('/login');
                }}>Logout</button>
            </div>

            {/* --- TAB NAVIGATION --- */}
            <div className="admin-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('inventory')}
                >
                    📦 Inventory Management
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('orders')}
                >
                    🚚 Customer Orders
                </button>
            </div>

            {/* --- TAB 1: INVENTORY (Your Old Layout) --- */}
            {activeTab === 'inventory' && (
                <div className="admin-content">
                    <div className="add-product-box">
                        <h2>Add New Item</h2>
                        <div className="input-group">
                            <label>Product Name</label>
                            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Name" />
                        </div>
                        <div className="input-group">
                            <label>Category</label>
                            <select value={productDetails.category} onChange={changeHandler} name="category" className="selector">
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Sub-Category</label>
                            <select value={productDetails.subCategory} onChange={changeHandler} name="subCategory" className="selector">
                                <option value="Top">Top (Shirt/Blouse)</option>
                                <option value="Bottom">Bottom (Pants/Skirt)</option>
                                <option value="Outerwear">Outerwear (Jacket/Coat)</option>
                                <option value="Dress">Dress</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Product Image</label>
                            <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
                        </div>
                        <div className="row-group">
                            <div className="input-group">
                                <label>Price</label>
                                <input value={productDetails.price} onChange={changeHandler} type="number" name="price" placeholder="RM" />
                            </div>
                            <div className="input-group">
                                <label>Stock</label>
                                <input value={productDetails.stock} onChange={changeHandler} type="number" name="stock" placeholder="Qty" />
                            </div>
                        </div>
                        <div className="input-group">
                            <p>Description</p>
                            <textarea value={productDetails.description} onChange={changeHandler} name="description" rows="3"></textarea>
                        </div>
                        <button onClick={addProduct} className="add-btn">ADD PRODUCT</button>
                    </div>

                    <div className="list-product-box">
                        <h2>Current Stock</h2>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.name}</td>
                                            <td>RM {product.price}</td>
                                            <td>{product.stock}</td>
                                            <td><button className="delete-btn-small" onClick={() => deleteProduct(product.name)}>X</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB 2: ORDERS (New Layout) --- */}
            {activeTab === 'orders' && (
                <div className="orders-box">
                    <h2>Recent Orders</h2>
                    <div className="table-container">
                        <table style={{width: "100%"}}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders.length === 0 ? <p>No orders yet.</p> : 
                                    allOrders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td style={{fontSize: "0.8rem"}}>{order.orderId}</td>
                                        <td>
                                            {order.fullName}<br/>
                                            <span style={{fontSize: "0.8rem", color:"gray"}}>{order.phone}</span>
                                        </td>
                                        <td>
                                            {/* Loop through items inside the order */}
                                            {order.items && order.items.map((item, i) => (
                                                <div key={i}>
                                                    • {item.name} (x{item.quantity})
                                                </div>
                                            ))}
                                        </td>
                                        <td>RM {order.totalAmount}</td>
                                        <td>
                                            <span className={`status-${order.status ? order.status.toLowerCase() : 'pending'}`}>
                                                {order.status || "Pending"}
                                            </span>
                                        </td>
                                        <td>
                                            {/* Dropdown to change status */}
                                            <select 
                                                className="status-select"
                                                defaultValue={order.status || "Pending"}
                                                onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    )
}
export default AdminDashboard;