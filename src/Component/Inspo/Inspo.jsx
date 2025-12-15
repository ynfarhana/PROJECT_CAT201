import React from "react";
import "./Inspo.css";
import {ModelInspo} from '../Assets/all_product'

function Inspo(){
    const imageToDisplay = ModelInspo;
    console.log("Model images:", typeof imageToDisplay, imageToDisplay);
    return (
        <div className="inspo">
            <h1>OUTFIT INSPO</h1>
            <hr />
            <div className="inspo-container">
                {imageToDisplay.map((imagePath,index) => {
                    console.log("Image path:", imagePath);
                    return (
                        <div 
                            key={index}
                            className="inspo-item">
                            <img src={imagePath} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Inspo;