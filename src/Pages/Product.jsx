import React, {useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import './Product.css'

function Product () {
    const {productId} = useParams();
    const { all_product, addToCart } = useContext(ShopContext); 

    const product = all_product.find((e) => e.id === productId);
    const [isAdding, setIsAdding] = useState(false);

    if(!product) {
        return <div style={{padding: "100px"}}>Loading Product... (or Item Not Found)</div>;
    }

    const handleAdd = async () => {
        setIsAdding(true);
        const ok = await addToCart(product);
        if (ok) alert("Added to your thrift bag!");
        else alert("Failed to add item to cart.");
        setIsAdding(false);
    };

    return (
        <div className="product-page">
            <div className="product-details-container">
                <div className="product-images">
                    <img src={product.image} alt={product.name} className="main-image" />
                </div>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="price">RM {Number(product.price).toFixed(2)}</p>
                    
                    <h3>Description:</h3>
                    <p>{product.description ? product.description : "No description available."}</p>

                    <div className="details">
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Sub-Category:</strong> {product.subCategory}</p>
                        
                        <p><strong>Sizes Available:</strong> 
                           {product.sizes ? product.sizes : "Free Size"}
                        </p>
                        
                        <p><strong>Condition:</strong> 
                           {product.condition ? product.condition : "Good"}
                        </p>
                    </div>

                    <button 
                        className="add-to-cart-btn" 
                        onClick={handleAdd}
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