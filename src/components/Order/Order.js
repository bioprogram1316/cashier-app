import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const orderItems = [];
    console.log(props);
    console.log(props.orderItems);
    props.orderItems.map( item => {
        return (orderItems.push({
            itemId: item.itemId,
            description: item.itemDescription,
            quantity: item.itemQuantity,
            itemSubtotal: item.itemSubtotal,
            pricePerUnit: item.pricePerUnit
        }));
    });

    console.log(orderItems);

    const itemOutput = orderItems.map(item => {
        return <div key={item.itemId} className={classes.OrderItem}>
            <p>{item.description}</p>
            <p>Item #: {item.itemId} </p>
            <p>(Quantity: {item.quantity} - Unit Price: ${item.pricePerUnit.toFixed(2)})</p>
            <p>Item Subtotal: ${item.itemSubtotal.toFixed(2)}</p>
        </div>;
    });

    return (
        <div className={classes.Order}>
            <h2>Order # {props.orderId}</h2>
            <div>{itemOutput}</div>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;