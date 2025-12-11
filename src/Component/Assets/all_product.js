import k_img1 from './k_img1.png';
import k_img2 from './k_img2.png';
import k_img3 from './k_img3.png';
import k_img4 from './k_img4.png';
import k_img5 from './k_img5.png';
import k_img6 from './k_img6.png';
import m_img1 from './m_img1.png';
import m_img2 from './m_img2.png';
import m_img3 from './m_img3.png';
import m_img4 from './m_img4.png';
import m_img5 from './m_img5.png';
import w_img1 from './w_img1.png';
import w_img2 from './w_img2.png';
import w_img3 from './w_img3.png';
import w_img4 from './w_img4.png';
import w_img5 from './w_img5.png';
import w_img6 from './w_img6.png';

export const products = [
    {
        id: "k001",
        name: "Kids Spider-Man Tee",
        description: "**Thrift Score !** Classic red and blue Spider-Man tee. Super soft cotton, ready-to-wear condition.",
        price: 11.99,
        image:[k_img1],
        category:"Kids",
        subcategory: "Topwear",
        sizes:["S", "M"],
        date_listed: Date.now(),
        condition: "Good"
    },

    {
        id: "k002",
        name: "Cabbage Patch Kids Duo-Sleeve Tee",
        description: "**Nostalgia Alert !** Super sweet Cabbage Patch Kids tee with duo-colored sleeves. Soft pink with vibrant graphics perfect vintage find.",
        price: 13.49,
        image: [k_img2],
        category:"Kids",
        subCategory: "Topwear",
        sizes: ["M (Age 7-8)"],
        date_listed: Date.now(),
        condition: "Excellent"
    },

    {
        id: "k003",
        name: "Diego & The Llama Graphic Tee",
        description: "**Adventure Time !** Rare character tee featuring Nick Jr.'s Diego and Llama friend. Great brown color and fun graphic-perfect for the thrift collector. Lightly worn, great for everyday play.",
        price: 11.99,
        image: [k_img3],
        category: "Kids", 
        subCategory: "Topwear",
        sizes: ["S (Age 3-5)"],
        date_listed: Date.now(),
        condition:"Good"
    },

    {
        id: "k004",
        name: "Retro Striped Green & Pink Shirt",
        description: "**Colour Pop !** Vibrant green and pink striped shirt with retro vibes. Short sleeves and crisp look-perfect to any outfit.",
        price: 19.99,
        image: [k_img4],
        category: "Kids", 
        subCategory: "Topwear",
        sizes:["S (Age 2-4)"],
        date_listed:Date.now(),
        condition: "Excellent"  
    },

    {
        id: "k005",
        name: "Strawberry Shortcake 2-Piece Set",
        description: "**Sweet Style !** Adorable 2-piece set featuring Strawberry Shortcake. Features an embroidered top with flutter sleeves and a denim skirt with gingham trim.",
        price: 25.00,
        image: [k_img5],
        category: "Kids",  
        subCategory: "Set",
        sizes:["(Age 1-2)"],
        date_listed:Date.now(),
        condition: "Excellent"  
    },

    {
        id: "k006",
        name: "Lightning McQueen Denim Shortalls",
        description: "**Racing Ready !** Cute denim shortalls featuring Lightning McQueen from Disney's Cars. Perfect for playtime and adventures.",
        price: 20.00,
        image: [k_img6],
        category:"Kids", 
        subCategory: "Bottomwear",
        sizes:["(Age 1-3)"],
        date_listed:Date.now(),
        condition: "Good"  
    },

    {
        id: "m001",
        name: "Retro Blue Graphic Back Tee",
        description: "**Street Style Steal !** Vintage-inspired blue graphic tee with bold back print. Soft fabric and relaxed fit-perfect for casual wear.",
        price: 20.49,
        image: [m_img1],
        category: "Men", 
        subCategory: "Topwear",
        sizes:["Oversized L (Fits XL)"],
        date_listed:Date.now(),
        condition: "Excellent"  
    },

    {
        id: "m002",
        name: "Retro Racing Color-Block Tee",
        description: "**Pit Stop Style !** Bold red, black and cream color-block jersey tee with striped sleeves. An instant wardrobe upgrade.",
        price: 24.99,
        image: [m_img2],
        category: "Men", 
        subCategory: "Topwear",
        sizes:["Oversize L"],
        date_listed:Date.now(),
        condition: "Excellent"  
    },
    
    {
        id: "m003",
        name: "Amazing Spiderman Comic Cover Tee",
        description: "**Collector Grade !** Classic navy tee featuring a distressed print of an old Spider-Man comic cover. Perfect color and fit—this is the vintage graphic tee everyone is hunting for!",
        price: 15.00,
        image: [m_img3],
        category: "Men", 
        subCategory: "Topwear",
        sizes: ["M"],
        date_listed:Date.now(),
        condition: "Good"  
    },
    
    {
        id: "m004",
        name: "Oversized Camp Collar Plaid Shirt",
        description: "**Summer Vibe !** Lightweight plaid shirt with a relaxed, oversized fit and camp collar. Perfect for layering or wearing solo on warm days.",
        price: 25.99,
        image: [m_img4],
        category: "Men", 
        subCategory: "Button-Down",
        sizes:["Oversize M (Boxy Fit)"],
        date_listed:Date.now(),
        condition: "Excellent"  
    },

    {
        id: "m005",
        name: "Y2K Embroidered Wide-Leg Jeans",
        description: "**Statement Denim !** Absolutely stunning wide-leg jeans with detailed, sweeping red and white side embroidery. Appears New With Tags (NWT)—score this unique Y2K look for your collection!.",
        price: 45.99,
        image: [m_img5],
        category: "Men", 
        subCategory: "Bottomwear",
        sizes:["Waist 32"],
        date_listed:Date.now(),
        condition: "Good"  
    },

    {
        id: "w001",
        name: "90s Textured Striped Utility Blouse",
        description: "**Jewel Tones & Texture !** Striking long-sleeve blouse in deep burgundy with subtle striped texture. Features a structured collar and cool utility buckle details at the waist. Perfect for a vintage professional or dark academia look.",
        price: 35.00,
        image: [w_img1],
        category: "Women", 
        subCategory: "Topwear",
        sizes:["S (Tailored Fit)"],
        date_listed:Date.now(),
        condition: "Good"  
    },
]