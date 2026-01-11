import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext'; // <--- 1. Import Context
import './Product.css';

function Product () {
    const { all_product } = useContext(ShopContext); // <--- 2. Get Live Data
    const { productId } = useParams();
    
  
    const product = all_product.find((e) => e.id == productId);
    if(!product) {
        return <div style={{padding: "100px"}}>Loading Product... (or Item Not Found)</div>;
    }

    return (
        <div className="product-page">
            <div className="product-details-container">
                <div className="product-images">
                    {/* 4. FIX: Use the image string directly. No [0] */}
                    <img src={product.image} alt={product.name} className="main-image" />
                </div>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="price">RM {Number(product.price).toFixed(2)}</p>
                    
                    <h3>Description:</h3>
                    {/* fallback text if description is empty */}
                    <p>{product.description ? product.description : "No description available."}</p>

                    <div className="details">
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Sub-Category:</strong> {product.subCategory}</p>
                        
                        <p><strong>Sizes Available:</strong> 
                           {/* Handle if sizes is missing or an array */}
                           {product.sizes ? product.sizes : "Free Size"}
                        </p>
                        
                        <p><strong>Condition:</strong> 
                           {product.condition ? product.condition : "Good"}
                        </p>
                    </div>

                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}   

export default Product;