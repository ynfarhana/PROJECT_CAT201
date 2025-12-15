import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

function Item (props) {
    return (
        <Link to={ `/product/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="item">
            <img src={props.image} alt="" />
            <p>{props.name}</p>
            <div className="item-price">
                <span>RM{props.price}</span>
                {/*<button>Add to Cart</button>*/}
            </div>
        </div>
        </Link>
    )
}

export default Item;