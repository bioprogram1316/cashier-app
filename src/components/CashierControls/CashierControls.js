import React from 'react';

import Button from '../UI/Button/Button';

const CashierControls = (props) => {

    return (
        <div>
            <Button clicked={props.addItem} btnType="Warning">Add New Item</Button>
            <Button clicked={props.clearOrder} btnType="Danger">Clear Order</Button>
            <Button clicked={props.checkout} btnType="Success">Checkout</Button>
        </div>
    );
}

export default CashierControls;