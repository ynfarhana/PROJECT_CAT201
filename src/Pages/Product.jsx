import React from 'react'
import { useParams } from 'react-router-dom'
import {products} from '../Component/Assets/all_product.js'
import './Product.css'

function Product () {
    const {productId} = useParams();
    const product = products.find((e) => e.id === productId);
    if(!product) {
        return <div>Product not found</div>;
    }
    return (
        <div className="product-page">
            <div className="product-details-container">
                <div className="product-images">
                    <img src={product.image[0]} alt={product.name} className="main-image" />
                </div>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="price">RM {product.price.toFixed(2)}</p>
                    <h3>Description:</h3>
                    <p>{product.description}</p>

                    <div className="details">
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Sub-Category:</strong> {product.subCategory}</p>
                        <p><strong>Sizes Available:</strong> {product.sizes.join(', ')}</p>
                        <p><strong>Condition:</strong> {product.condition}</p>
                    </div>

                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}   

export default Product