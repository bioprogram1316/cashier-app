import React from 'react';

import classes from './CurrentOrderItem.module.css';

const currentOrderItem = (props) => (
    <div className={classes.Item}>
        <h3>Item Number: {props.item.itemId}</h3>
        {props.item.itemDescription}
        <p>Price per unit: ${props.item.pricePerUnit.toFixed(2)}, Quantity: {props.item.itemQuantity}</p>
        <p>Item Subtotal: ${props.item.itemSubtotal.toFixed(2)}</p>
        {console.log(props)}
        <div>
            <button className={classes.AddItem} onClick={props.increased}>Item +1</button>
            <button className={classes.RemoveItem} onClick={props.removed}>Item -1</button>
            <button className={classes.DeleteItem} onClick={props.deleted}>Delete Item</button>
        </div> 
    </div>
);

export default currentOrderItem;