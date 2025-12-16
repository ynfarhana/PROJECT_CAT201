import React, {useState} from "react";
import "./Inspo.css";
import {ModelInspo} from '../Assets/all_product'
import womenIcon from '../Assets/w_icon.JPG'
import menIcon from '../Assets/m_icon.JPG'
import kidsIcon from '../Assets/k_icon.JPG'

function Inspo(){
    const [activeFilter, setActiveFilter] = useState(null);
    const categories = [
        { name: 'Women', icon: womenIcon},
        { name: 'Men', icon: menIcon},
        { name: 'Kids', icon: kidsIcon},
    ];

    const filteredImages = ModelInspo.filter(item => {
        return item.category === activeFilter;
    });
    
    const showFilterIcons = activeFilter === null;
    const showModelImages = activeFilter !== null && filteredImages.length > 0;

    //console.log("Model images:", typeof imageToDisplay, imageToDisplay);
    return (
        <div className="inspo">
            <h1>OUTFIT INSPO</h1>
            <hr />

            {/* the initial state where it display 3 Icon images */}
            {showFilterIcons && (
            <div className="inspo-filters">
                {categories.map((category) => (
                    <button
                        key={category.name}
                        className="image-filter-button initial-icon"
                        onClick={() => setActiveFilter(category.name)}>

                        <img 
                            src={category.icon} 
                            alt={`${category.name} category filter`}
                            className="filter-icon" />

                            <p>{category.name.toUpperCase()}</p>
                    </button>
                ))}
            </div>
            )}

            {/* when the user click on of the icon, it will display 4 images */}
            {showModelImages && (
                <div className="inspo-container">
                    {filteredImages.map((item) => (
                        <div 
                            key={item.id}
                            className="inspo-item transition-item"
                            onClick={() => setActiveFilter(item.category)}>
                            
                            <img 
                                src={item.image} 
                                alt={`Outfit Inspiration ${item.id}`}
                                style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                        </div>
                    ))}
                </div>
            )}

             {activeFilter !== null && (
                <button className="back-button" onClick={() => setActiveFilter(null)}>
                    ← Back to Categories
                </button>
             )}  
        </div>
    )
}

export default Inspo;