import React from 'react' 
import Hero from '../Component/Hero/Hero'
import heroImage from '../Component/Assets/Banner/hero-banner.png'

const Shop = () => {
    return (
        <div>
            <Hero
            image={heroImage}
            //title={"Thrift Fashion"}
            //subtitle={"Discover Unique Styles at Unbeatable Prices"}
            />
        </div>
    );
}

export default Shop


