import React from "react";
import "./Brands.css";
import shein from '../Assets/shein.jpg';
import padini from '../Assets/padini.jpg';
import zara from '../Assets/zara.jpg';
import mango from '../Assets/mango.jpg';
import tinybutton from '../Assets/tinybutton.jpg';
import hnm from '../Assets/hnm.jpg';
import cottonon from '../Assets/cottonon.jpg';
import levis from '../Assets/levis.jpg';
import uniqlo from '../Assets/uniqlo.jpg';
import bo from '../Assets/bo.jpg';

function Brands (){

    const Brandlist = [
        { name: "Shein", img: shein },
        { name: "Padini", img: padini },
        { name: "Zara", img: zara },
        { name: "Mango", img: mango },
        { name: "Tinybutton", img: tinybutton },
        { name: "Hnm", img: hnm },
        { name: "Cottonon", img: cottonon },
        { name: "Levis", img: levis },
        { name: "Uniqlo", img: uniqlo },
        { name: "BO", img: bo }
    ];
    
    return(
        <div className="brands-section"> 

                <div className="brands-header">
                    <h2>THOUSANDS OF BRANDS</h2>
                    <hr />
                </div>

                <div className="brands-grid">
                    {Brandlist.map((brand, index) => (
                        <div key={index} className="brands-box">
                            <img src={brand.img} alt={brand.name} />
                        </div>
                    ))}
                </div>    
        </div> 
    );
}

export default Brands;