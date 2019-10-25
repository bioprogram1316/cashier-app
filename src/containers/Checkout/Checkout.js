import React, {Component} from 'react';
import {connect} from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import ContactForm from './ContactForm/ContactForm';
import Order from '../../components/Order/Order';

class Checkout extends Component {

    state = {
        purchaseComplete: false
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.setState({purchaseComplete: true});
    };

    checkoutCompleteHandler = () => {
        this.setState({purchaseComplete: false});
        this.props.history.push('/');
    };

    render () {

    return (
    <div>
        <Modal show={this.state.purchaseComplete} closed={this.checkoutCompleteHandler}>
            <h3>Your order is now complete.</h3> 
            <h3>You will be sent an order confirmation shortly to the email provided.</h3>
        </Modal>
        <h1>Order Summary</h1>
        <Order 
            orderId={this.props.orderId}
            orderItems={this.props.orderItems}
            price={this.props.total}
        />
        {console.log(this)}
        <ContactForm checkoutComplete={this.checkoutContinueHandler}/>
        <Button clicked={this.checkoutCancelledHandler} btnType="Danger">CANCEL</Button> 
    </div>
    )}};

const mapStateToProps = state => {
    return {
        orderId: state.cashier.orderId,
        orderItems: state.cashier.orderItems,
        total: state.cashier.totalPrice

    };
};

export default connect(mapStateToProps)(Checkout);