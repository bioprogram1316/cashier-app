import React from 'react';

import CurrentOrderItem from '../../components/Order/CurrentOrderItem/CurrentOrderItem';
import classes from './CurrentOrder.module.css';

const currentOrder = (props) => {
    let orderItems = props.currOrder.map(item => 
        (
            <CurrentOrderItem 
                key={item.itemId} 
                item={item} 
                removed={() => props.removeItem(item.itemId)}
                increased={() => props.increaseQuantity(item.itemId)}
                deleted={() => props.deleteItem(item.itemId)}
            />
        )
    );

    return (
    <div>
        {/* <div className={classes.Customer}>
            <h3>Cutomer Information</h3>
            <p>Customer Name: {props.currOrder.customerInfo.customerName}</p>
        </div> */}
        <h2>Order {props.orderId} Items</h2>
        <ul>
            {console.log(props)}
            {orderItems}
        </ul>
    </div>
    );
};

export default currentOrder;