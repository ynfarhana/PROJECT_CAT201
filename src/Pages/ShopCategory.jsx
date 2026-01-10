import React, { useContext } from 'react';
import './ShopCategory.css'; 
import { ShopContext } from '../Context/ShopContext'; 
import Item from '../Component/Item/Item';
import Footer from '../Component/Footer/Footer';

const ShopCategory = (props) => {
    // Get the live data from the Warehouse (Context)
    const { all_product } = useContext(ShopContext);

    return (
        <div className="shop-category">
            
            {/* Sort/Banner Section */}
            <div className="shopcategory-indexSort">
                <p><span>Showing Products</span></p>
            </div>

            <div className="shopcategory-products">
                {all_product.map((item, i) => {
                    // Safety Check: Convert "Men" to "men" so they match
                    const pageCategory = props.category ? props.category.toLowerCase() : "";
                    const itemCategory = item.category ? item.category.toLowerCase() : "";

                    if (pageCategory === itemCategory) {
                        return (
                            <Item 
                                key={i} 
                                id={item.id} 
                                name={item.name} 
                                image={item.image} // Passes the image URL string
                                price={item.price} 
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            
            <Footer/>
        </div>
    );
}

export default ShopCategory;