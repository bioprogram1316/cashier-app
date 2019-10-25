import React, {Component} from 'react';
import {connect} from 'react-redux';

import CurrentOrder from '../CurrentOrder/CurrentOrder';
import CashierControls from '../../components/CashierControls/CashierControls';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/appAux';

class Cashier extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitOrder();
    }

    updatePurchaseState (orderItems) {
        
        const sum = Object.keys(orderItems)
            // change object into an array of the number of each orderItem
            .map(iKey => {
                return orderItems[iKey];
            })
            // sum the number of individual items
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0; 
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.hisory.push('/auth');
        }
    }

    purchaseContinueHandler = () => {
        const newOrder = {
            orderId: this.props.oId,
            orderItems: this.props.oItems,
            totalPrice: this.props.price
        };
        this.props.onSetOrder(newOrder);
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    addItemsHandler = () => {
        this.props.history.push('/addItems');
    }

    render () {
        console.log(this.props);
        return (
            <Aux>
                <h1>Cashier</h1>
                <CurrentOrder 
                    orderId={this.props.oId}
                    currOrder={this.props.oItems} 
                    removeItem={this.props.onRemoveItem}
                    increaseQuantity={this.props.onIncreaseQuantity}
                    deleteItem={this.props.onDeleteItem}
                />
                <CashierControls 
                    addItem={this.addItemsHandler}
                    orderId={this.props.oId}
                    orderInfo={this.props.oItems}
                    subtotal={this.props.totalPrice}
                    clearOrder={this.props.onClearOrder}
                    checkout={this.purchaseContinueHandler}
                />
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
            </Aux>);
    }
}

const mapStateToProps = state => {
    return {
        oId: state.cashier.orderId,
        oItems: state.cashier.orderItems,
        price: state.cashier.totalPrice,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetOrder: (order) => dispatch(actions.setOrder(order)),
        onInitOrder: () => dispatch(actions.initOrder()),
        onRemoveItem: (id) => dispatch(actions.removeItem(id)),
        onIncreaseQuantity: (id) => dispatch(actions.increaseQuantity(id)),
        onDeleteItem: (id) => dispatch(actions.deleteItem(id)),
        onClearOrder: () => dispatch(actions.clearOrder()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cashier);