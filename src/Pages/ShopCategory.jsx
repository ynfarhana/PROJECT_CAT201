import React, { useContext } from 'react';
import './ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Component/Item/Item';
import Footer from '../Component/Footer/Footer';

function ShopCategory(props) {
    // 1. Get the "Warehouse" data (all_product)
    const { all_product } = useContext(ShopContext);
    console.log("Checking products...", all_product); // Debugging tool

    return (
        <div className="shop-category">
            
            {/* 2. Banner / Header (Optional) */}
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing Products</span> for {props.category}
                </p>
            </div>

            {/* 3. The Grid of Products */}
            <div className="shopcategory-products">
                {all_product.map((item, i) => {
                    // 4. FILTER: Only show items that match the category (Men/Women/Kids)
                    if (props.category === item.category) {
                        return (
                            <Item 
                                key={i} 
                                id={item.id} 
                                name={item.name} 
                                image={item.image} 
                                price={item.price} 
                            />
                        );
                    } else {
                        return null; // Don't show if category doesn't match
                    }
                })}
            </div>

            {/* 5. Keep Ain's Footer */}
            <Footer/>
        </div>
    );
}

export default ShopCategory;