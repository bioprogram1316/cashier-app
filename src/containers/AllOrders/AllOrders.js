import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class AllOrders extends Component {

     componentDidMount() {
         this.props.onFetchOrders(this.props.token, this.props.userId);
     }

    render () {
        console.log(this.props);
        let orders = <Spinner />; 
        if (!this.props.loading) {
        orders = this.props.orders.map(order => (
                <Order 
                   key={order.id}
                   orderId={order.orderId}
                   orderItems={order.orderItems}
                   price={order.totalPrice}
               />
            ))
        }
        console.log(orders);
        
        return ( 
            <div>{orders}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders, axios);

