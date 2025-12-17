import React from "react";
import "./Intro.css";

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
                    <div className="trust-points">
                        <ul>
                            <li>
                                <strong>Curated Quality:</strong> Every piece is hand-inspected for quality, cleanliness, and authenticity, ensuring you receive items in excellent, ready-to-wear condition. 
                            </li>
                            <li>
                                <strong>Unique Style:</strong> Find rare, vintage, and one-of-a-kind items you won't see everyone else wearing. Your style, personalized and sustainable.
                            </li>
                            <li>
                                <strong>Ethical choice:</strong> We are committed to transparency in sourcing and supporting local charities, making your purchase impactful beyond your wardrobe.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Intro;