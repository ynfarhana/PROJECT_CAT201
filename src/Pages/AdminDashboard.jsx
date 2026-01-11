import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { storage } from "../firebase"; // Import the file we just made
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AdminDashboard() {
    const navigate = useNavigate();
    
    // State for Form
    const [productDetails, setProductDetails] = useState({
        name: "", 
        category: "Women", 
        subCategory: "Top", 
        price: "", 
        stock: "" , 
        image: "", 
        description: ""
    });
    
    // State for the List of Products
    const [allProducts, setAllProducts] = useState([]);

    // State for the Image File
    const [imageUpload, setImageUpload] = useState(null); // Holds the file user picks

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
        let finalImageUrl = productDetails.image; // Default to existing text if any

        // If user picked a file, upload it first
        if (imageUpload) {
            finalImageUrl = await uploadImage();
            if (!finalImageUrl) return; // Stop if upload failed
        }

        // Now send everything to Java (using the new URL)
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
                setProductDetails({name: "", category: "Women", subCategory: "Top", price: "", stock: "", image: ""});
                setImageUpload(null); // Clear the file
                fetchProducts();
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

    // FUNCTION 4: Upload Product Image
    const uploadImage = async () => {
        if (!imageUpload) return null;

        // Create a unique filename (e.g., "images/shirt_12345.jpg")
        const imageRef = ref(storage, `images/${imageUpload.name + Date.now()}`);

        try {
            // 1. Upload the file
            const snapshot = await uploadBytes(imageRef, imageUpload);
            
            // 2. Get the URL
            const url = await getDownloadURL(snapshot.ref);
            console.log("Uploaded Image URL:", url);
            return url;
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Image upload failed!");
            return null;
        }
    };

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
                    {/* File Picker */}
                    <input 
                        type="file" 
                        onChange={(e) => setImageUpload(e.target.files[0])} 
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
                    <div className="input-group">
                        <p>Product Description</p>
                        <textarea 
                            value={productDetails.description} 
                            onChange={changeHandler} 
                            name="description" 
                            rows="4" 
                            placeholder="Type description here..."
                        ></textarea>
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