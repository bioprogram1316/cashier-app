import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import TraditionalBarcodeScanner from './BarcodeScanner/TraditionalBarcodeScanner';
import AddItemForm from './ManualAddItems/AddItemForm';

class AddItems extends Component {
    state = {
        manualAdd: false,
        cameraScan: false,
        scannerScan: false,
        addItemsComplete: false,
        addedOrders: []
    }

    cancelAddItemHandler = () => {
        this.setState({
            manualAdd: false,
            scannerScan: false,
            cameraScan: false
        })
        this.props.history.goBack();
    };

    manuallyAddItemHandler = () => {
        this.setState({
            scannerScan: false,
            cameraScan: false,
            manualAdd: true
        });
    };

    cameraScanAddItemHandler = () => {
        this.setState({
            manualAdd: false,
            scannerScan: false,
            cameraScan: true
        });
    };

    scannerScanAddItemHandler = () => {
        this.setState({
            cameraScan: false,
            manualAdd: false,
            scannerScan: true
        });
    };

    addItemCompleteHandler = (addedItems, addedItemTotal) => {
        this.setState({addItemsComplete: true});
        // should go to the current order page with all added items added to the old order
        const oldOrder = {
            orderId: this.props.orderId,
            orderItems: this.props.orderItems,
            totalPrice: this.props.total
        };
        const newOrderItems = oldOrder.orderItems.push(addedItems);
        const newOrderTotal = oldOrder.totalPrice + addedItemTotal;
        const newOrder = {
            orderId: this.props.orderId,
            orderItems: newOrderItems,
            totalPrice: newOrderTotal
        };
        //this.props.onSetOrder(newOrder);
        //this.props.history.push('./cashier');
    };

    finishedCameraScanAddHandler = () => {
        this.setState({cameraScan: false});
        // add scanned items to added items list
    }

    finishedScannerAddHandler = () => {
        this.setState({scannerScan: false});
        // add scanned items to added items list
    }

    finishedManualAddHandler = () => {
        this.setState({manualAdd: false});
        // add manually added items to added items list
    }

    render () {


        return (
            <div>
                <h2>Add Items:</h2>
                <Modal show={this.state.cameraScan} closed={this.finishedCameraScanAddHandler} >
                    Camera Scan Add
                </Modal>
                <Modal show={this.state.scannerScan} closed={this.finishedScannerAddHandler} >
                    Begin Scanning your Items
                    <TraditionalBarcodeScanner />
                </Modal>
                <Modal show={this.state.manualAdd} closed={this.finishedManualAddHandler}>
                    <AddItemForm closeForm={this.finishedManualAddHandler}/> 
                </Modal>
                <Button clicked={this.cameraScanAddItemHandler} btnType="Success">Scan items with camera</Button>
                <Button clicked={this.scannerScanAddItemHandler} btnType="Success">Scan items with scanner</Button>
                <Button clicked={this.manuallyAddItemHandler} btnType="Success">Manually add items</Button>
                <h3>Added Items:</h3>
                <Button btnType="Login">Finished Adding Items</Button>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        orderId: state.cashier.orderId,
        orderItems: state.cashier.orderItems,
        total: state.cashier.totalPrice

    };
};

export default connect(mapStateToProps)(AddItems);