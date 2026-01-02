import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();
    
    // State for Form
    const [productDetails, setProductDetails] = useState({
        name: "", category: "Women", price: "", stock: "" , image: ""
    });
    
    // State for the List of Products
    const [allProducts, setAllProducts] = useState([]);

    // Security Check + Load Data
    useEffect(() => {
        const role = localStorage.getItem('user-role');
        if (role !== 'admin') {
            navigate('/login');
        } else {
            fetchProducts(); // Load data when page opens
        }
    }, [navigate]);

    // FUNCTION 1: Get data from Java
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/product');
            const data = await response.json();
            setAllProducts(data); // Save list to state
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    // FUNCTION 2: Add Product
    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value});
    }

    const addProduct = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productDetails),
            });
            const data = await response.json();
            if (data.status === 'success') {
                alert("Added!");
                setProductDetails({name: "", category: "Women", price: "", stock: ""}); // Clear form
                fetchProducts(); // Refresh the table immediately!
            } else {
                alert("Failed: " + data.message);
            }
        } catch (error) {
            alert("Connection Failed");
        }
    }

    // FUNCTION 3: Delete Product (Linked to Table Button)
    const deleteProduct = async (name) => {
        if (!window.confirm("Delete " + name + "?")) return;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/product?name=${encodeURIComponent(name)}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.status === 'success') {
                fetchProducts(); // Refresh table
            } else {
                alert("Failed: " + data.message);
            }
        } catch (error) {
            alert("Connection Failed");
        }
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>👑 Admin Inventory</h1>
                <button className="logout-btn" onClick={() => {
                    localStorage.removeItem('user-role');
                    navigate('/login');
                }}>Logout</button>
            </div>

            <div className="admin-content">
                {/* LEFT SIDE: ADD FORM */}
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
                        <label>Image URL</label>
                        <input 
                            value={productDetails.image} 
                            onChange={changeHandler} 
                            type="text" 
                            name="image" 
                            placeholder="Paste link (e.g., https://imgur.com/...)" 
                        />
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

                {/* RIGHT SIDE: PRODUCT LIST TABLE */}
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
                                        <td>
                                            <button 
                                                className="delete-btn-small" 
                                                onClick={() => deleteProduct(product.name)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;