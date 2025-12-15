import React from 'react' 
import Hero from '../Component/Hero/Hero'
import Inspo from '../Component/Inspo/Inspo';
const heroImage = "/hero-banner.svg"

function Shop () {
    return (
        <div>
            <Hero
            image={heroImage}
            title= "Discover Your Style"
            subtitle= "Curated Vintage & Thrift for Every Style"
            />
            <Inspo/>
        </div>
    );
}

export default Shop


