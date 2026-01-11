import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('inventory');

    const [productDetails, setProductDetails] = useState({
        name: "", category: "Women", subCategory: "Top", price: "", stock: "" , image: "", description: ""
    });
    const [allProducts, setAllProducts] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem('user-role');
        if (role !== 'admin') {
            navigate('/login');
        } else {
            fetchProducts();
            fetchOrders();
        }
    }, [navigate]);

    // 📦 Inventory
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/product');
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value});
    };

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
                alert("Product Added Successfully!");
                setProductDetails({name: "", category: "Women", subCategory: "Top", price: "", stock: "", image: "", description: ""});
                setImageUpload(null);
                fetchProducts();
            } else {
                alert("Failed: " + data.message);
            }
        } catch (error) {
            alert("Connection Failed");
        }
    };

    const deleteProduct = async (name) => {
        if (!window.confirm("Delete " + name + "?")) return;
        try {
            await fetch(`http://localhost:8080/api/admin/product?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
            fetchProducts();
        } catch (error) {
            alert("Connection Failed");
        }
    };

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

    // 🚚 Orders
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/orders');
            const data = await response.json();
            setAllOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        if(!newStatus) return;
        try {
            const response = await fetch(`http://localhost:8080/api/admin/orders?orderId=${orderId}&status=${newStatus}`, {
                method: 'POST'
            });
            const data = await response.json();
            if (data.success) {
                alert(`Order #${orderId} updated to ${newStatus}`);
                fetchOrders();
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

   return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>👑 Admin Dashboard</h1>
                <button className="logout-btn" onClick={() => {
                    localStorage.removeItem('user-role');
                    navigate('/login');
                }}>Logout</button>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inventory')}
                >
                    📦 Inventory
                </button>
                <button
                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    🚚 Customer Orders
                </button>
            </div>

            {/* --- TAB 1: INVENTORY (Your Original Code) --- */}
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
                            <label>Image</label>
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
                            <label>Description</label>
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

            {/* --- TAB 2: ORDERS (Ain's Design + Your Data) --- */}
            {activeTab === 'orders' && (
                <div className="orders-container fade-in">
                    <div className="orders-box">
                        <h2>📦 Incoming Orders</h2>
                        <div className="table-container full-width">
                            <table style={{width: "100%"}}>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Items Ordered</th> {/* Added this back! */}
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrders.length === 0 ? (
                                        <tr><td colSpan="6" style={{textAlign:"center", padding:"20px"}}>No orders found.</td></tr>
                                    ) : (
                                        allOrders.map((order, i) => (
                                            <tr key={i}>
                                                <td style={{fontWeight: "bold"}}>
                                                    {/* Changed from order.id to order.orderId to match your Java */}
                                                    #{order.orderId ? order.orderId.slice(-6) : "???"} 
                                                </td>
                                                <td>
                                                    <div style={{fontWeight:"600"}}>{order.fullName}</div>
                                                    <div style={{fontSize:"0.8rem", color:"#666"}}>{order.phone}</div>
                                                </td>
                                                <td>
                                                    {/* Added the Item Loop back so you can see what they bought */}
                                                    {order.items && order.items.map((item, idx) => (
                                                        <div key={idx} style={{fontSize:"0.85rem"}}>
                                                            • {item.name} x{item.quantity}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td style={{fontWeight:"bold", color:"#2c3e50"}}>
                                                    RM {order.totalAmount}
                                                </td>
                                                <td>
                                                    <span className={`status-pill ${order.status ? order.status.toLowerCase() : 'pending'}`}>
                                                        {order.status || 'Received'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <select 
                                                        className="status-selector"
                                                        value={order.status || "Pending"}
                                                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;