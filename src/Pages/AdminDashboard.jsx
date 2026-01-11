import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AdminDashboard() {
    const navigate = useNavigate();
    
    // TAB STATE: Toggle between 'inventory' and 'orders'
    const [activeTab, setActiveTab] = useState('inventory');
    
    // Inventory States
    const [productDetails, setProductDetails] = useState({
        name: "", category: "Women", subCategory: "Top", price: "", stock: "" , image: "", description: ""
    });
    const [allProducts, setAllProducts] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);

    // ORDER STATES [New]
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem('user-role');
        if (role !== 'admin') {
            navigate('/login');
        } else {
            fetchProducts();
            fetchOrders(); // Fetch orders when page opens
        }
    }, [navigate]);

    // --- INVENTORY FUNCTIONS ---
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/product');
            const data = await response.json();
            setAllProducts(data);
        } catch (error) { console.error("Error:", error); }
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
            }
        } catch (error) { alert("Connection Failed"); }
    }

    const deleteProduct = async (name) => {
        if (!window.confirm("Delete " + name + "?")) return;
        try {
            const response = await fetch(`http://localhost:8080/api/admin/product?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.status === 'success') fetchProducts();
        } catch (error) { alert("Connection Failed"); }
    }

    const uploadImage = async () => {
        if (!imageUpload) return null;
        const imageRef = ref(storage, `images/${imageUpload.name + Date.now()}`);
        try {
            const snapshot = await uploadBytes(imageRef, imageUpload);
            return await getDownloadURL(snapshot.ref);
        } catch (error) { return null; }
    };

    // --- ORDER FUNCTIONS [New] ---
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/orders');
            const data = await response.json();
            setAllOrders(data);
        } catch (error) { console.error("Error fetching orders:", error); }
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await fetch(`http://localhost:8080/api/admin/orders/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: orderId, status: newStatus })
            });
            fetchOrders(); // Refresh the list
        } catch (error) { alert("Update failed"); }
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>👑 Admin Panel</h1>
                <div className="header-actions">
                    <button 
                        className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inventory')}
                    >Inventory</button>
                    <button 
                        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >Orders Received</button>
                    <button className="logout-btn" onClick={() => {
                        localStorage.removeItem('user-role');
                        navigate('/login');
                    }}>Logout</button>
                </div>
            </div>

            <div className="admin-content">
                {activeTab === 'inventory' ? (
                    // --- YOUR FRIEND'S ORIGINAL CONTENT ---
                    <>
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
                                    {allProducts.map((p, i) => (
                                        <tr key={i}>
                                            <td>{p.name}</td>
                                            <td>RM {p.price}</td>
                                            <td>{p.stock}</td>
                                            <td><button onClick={() => deleteProduct(p.name)}>X</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </>
                ) : (
                    // --- NEW ORDERS VIEW ---
                    <div className="orders-container fade-in">
                        <h2>📦 Incoming Orders</h2>
                        <div className="table-container full-width">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Payment</th>
                                        <th>Message from User</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrders.map((order, i) => (
                                        <tr key={i}>
                                            <td>#{order.id}</td>
                                            <td>{order.fullName}</td>
                                            <td>{order.paymentMethod}</td>
                                            <td className="user-note">"{order.message || 'No message'}"</td>
                                            <td>
                                                <span className={`status-pill ${order.status?.toLowerCase()}`}>
                                                    {order.status || 'Received'}
                                                </span>
                                            </td>
                                            <td>
                                                <select 
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="status-selector"
                                                >
                                                    <option value="">Update Status</option>
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
        </div>
    )
}

export default AdminDashboard;