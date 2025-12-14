import React, { useState } from 'react' 
import { products } from '../Component/Assets/all_product.js'
import Item from '../Component/Item/Item'
import Hero from '../Component/Hero/Hero'
const heroImage = "/hero-banner.svg"

const Shop = () => {

    const[activeFilter, setActiveFilter] = useState("All")
    const getFilteredProducts = () => {
        if(activeFilter === "All") {
            return products;
        }
        return products.filter(product => products.id.startsWith(activeFilter))
    };

    const productsToDisplay = getFilteredProducts();
    console.log("Item is:", Item);
    console.log("Hero is:", Hero);
    return (
        <div>
            <Hero
            image={heroImage}
            title= "Discover Your Style"
            subtitle= "Curated Vintage & Thrift for Every Style"
            />
            <div className="category-filters">
                <button
                    onClick={() => setActiveFilter("All")}
                    className={activeFilter === "All" ? "active-filter" : ""}>
                    All Products ({products.length})
                </button>
                <button
                    onClick={() => setActiveFilter("K")}
                    className={activeFilter === "K" ? "active-filter" : ""}>
                    Kids
                </button>
                <button
                    onClick={() => setActiveFilter("M")}
                    className={activeFilter === "M" ? "active-filter" : ""}>
                    Men
                </button>
                <button
                    onClick={() => setActiveFilter("W")}
                    className={activeFilter === "W" ? "active-filter" : ""}>
                    Women
                </button>
            </div>

            {/* to display the current category title*/}
            <h2 className="shop-title">
                {activeFilter} Finds ({productsToDisplay.length})
            </h2>

            {/* the product grid container*/}
            {/*<div className="product-grid-container">
                {productsToDisplay.map((item) => (
                    <Item 
                     key= {item.id}
                     id={item.id}
                     image={item.image && item.image.length > 0 ? item.image[0] : '/path/to/placeholder.jpg'}
                     name={item.name}
                     price={item.price}
                    />
                ))}
            </div>*/}
        </div>
    );
}

export default Shop


