import React, { createContext, useState, useEffect } from "react";
import { products as static_products } from "../Component/Assets/all_product";

// Create the warehouse (Context)
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    
    // This state will hold ALL your products from the database
    const [all_product, setAll_product] = useState([]);

    // When the website loads, go get the data from Java!
    useEffect(() => {
        fetch('/api/admin/product') // Use your GET API
        .then((response) => response.json())
        .then((data) => {
            console.log("Data loaded from Java:", data);
            setAll_product([...static_products, ...data]); // Merge static and dynamic products
        })
        .catch((error) => console.error("Failed to load products:", error));
    }, []);

    // Helper: Function to filter products by category (Men, Women, Kids)
    // This matches the logic Ain needs for her pages
    const getProductsByCategory = (category) => {
        return all_product.filter(item => item.category === category);
    };

    // Pack everything into a box to send to other pages
    const contextValue = { all_product, getProductsByCategory };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;