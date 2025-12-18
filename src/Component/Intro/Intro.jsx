import React from "react";
import "./Intro.css";
import quality_p from '../Assets/quality_p.jpg';
import affordable_p from '../Assets/affordable_p.jpg';
import unique_p from '../Assets/unique_p.jpg';

function Intro (){
    return(
        <div className="intro-section">
            <div className="intro-content">

                {/*the section where display what is mean by thrift*/}
                <div className="intro-item what-is-thrift">
                    <h2>🌱 What is Thrift?</h2>
                    <p>
                       Thrifting is the act of buying pre-owned or second-hand items. 
                       It’s more than just shopping—it's a conscious choice to give clothing a second life, reducing fashion waste and contributing to a circular economy. 
                       Every purchase helps lower the global fashion industry's environmental footprint. 
                    </p>
                </div>

                {/*the section where display why choose/trust our store? */}
                <div className="intro-item why-choose-us">
                    <h2>⭐ Why Use Thrift Store ?</h2>

                        <div className="advantage-row">
                            <img src={quality_p} alt="Curated Quality" />
                            <div className="advantage-text">
                                <h3>Curated Quality</h3>
                                <p>Every piece is hand-inspected for quality, cleanliness, and authenticity, ensuring you receive items in excellent condition.</p>
                            </div>
                        </div>

                        <div className="advantage-row">
                            <img src={unique_p} alt="Unique Style" />
                            <div className="advantage-text">
                                <h3>Unique Style</h3>
                                <p>Find rare, vintage, and one-of-a-kind items you won't see everyone else wearing. Your style, personalized and sustainable.</p>
                            </div>
                        </div>

                        <div className="advantage-row">
                            <img src={affordable_p} alt="Affordable Prices" />
                            <div className="advantage-text">
                                <h3>Affordable Prices</h3>
                                <p>Look your best without breaking the bank. We offer premium, high-quality fashion at a fraction of the retail price, making sustainable style accessible to everyone.</p>
                            </div>
                        </div>
                </div>

            </div>
        </div>

    );
}

export default Intro;