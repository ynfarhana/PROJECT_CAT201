import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import {products} from '../Component/Assets/all_product.js'
//import { ShopContext } from '../Context/ShopContext';
import './Product.css'

function Product () {

    const {productId} = useParams();
    const product = products.find((e) => e.id === productId);
    const [isAdding] = useState(false);
    //const { all_product } = useContext(ShopContext); 

    if(!product) {
        return <div style={{padding: "100px"}}>Loading Product... (or Item Not Found)</div>;
    }

    const addToCart = async () => {
        try {
            // Use a relative path so the proxy in package.json forwards it to :8080
            const response = await fetch(`/api/cart?action=add&id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}`, {
                method: 'POST',
            });

            if (response.ok) {
                alert("Added to your thrift bag!");
            } else {
                alert("Failed to add item to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add item to cart.");
        }
    };


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

                    <button 
                        className="add-to-cart-btn" 
                        onClick={addToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? "ADDING..." : "ADD TO CART"}
                    </button>

                </div>
            </div>
        </div>
    )
}   

export default Product;