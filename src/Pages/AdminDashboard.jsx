import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // We will create this CSS file next

function AdminDashboard() {
    const navigate = useNavigate();

    // 1. Setup State to store form data
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "Women", // Default value
        price: "",
        stock: ""
    });

    // Security Check: Kick them out if not admin
    useEffect(() => {
        const role = localStorage.getItem('user-role');
        if (role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    // 2. Handle Typing in the form
    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value});
    }

    // 3. Send Data to Java Backend
    const addProduct = async () => {
        console.log("Sending to Java:", productDetails);
        
        try {
            const response = await fetch('http://localhost:8080/api/admin/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productDetails),
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert("Success! " + data.message);
                // Clear the form
                setProductDetails({name: "", category: "Women", price: "", stock: ""});
            } else {
                alert("Failed: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Could not connect to Java Server. Is it running?");
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

            <div className="admin-content">
                <div className="add-product-box">
                    <h2>Add New Item</h2>
                    
                    <div className="input-group">
                        <label>Product Name</label>
                        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="e.g. Vintage Denim Jacket" />
                    </div>

                    <div className="input-group">
                        <label>Category</label>
                        <select value={productDetails.category} onChange={changeHandler} name="category" className="selector">
                            <option value="Women">Women</option>
                            <option value="Men">Men</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>

                    <div className="row-group">
                        <div className="input-group">
                            <label>Price (RM)</label>
                            <input value={productDetails.price} onChange={changeHandler} type="number" name="price" placeholder="50.00" />
                        </div>
                        <div className="input-group">
                            <label>Stock Qty</label>
                            <input value={productDetails.stock} onChange={changeHandler} type="number" name="stock" placeholder="10" />
                        </div>
                    </div>

                    <button onClick={addProduct} className="add-btn">ADD PRODUCT</button>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;