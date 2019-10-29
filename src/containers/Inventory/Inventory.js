import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import ImportInventoryForm from './ImportInventoryForm/ImportInventoryForm';

class Inventory extends Component {
    state = {
        importComplete: false,
        importing: true
    }
    // componentDidMount() {
        // fetch inventory associated with this user 
        // give option to import new inventory
        // if there is no associated inventory, only option should be to import
    //     this.props.onFetchInventory(this.props.token, this.props.userId);
    // }

    importCompleteHandler = () => {
        this.setState({importComplete: false});
        this.setState({importing: false});
    };

    importHandler = () => {
        this.setState({importing: true});
    };

    importCancelledHandler = () => {
    };

    render () {
        // console.log(this.props);
         let inventory = <Spinner />; 
        // if (!this.props.loading) {
        // inventory = this.props.orders.map(item => (
        //         <li><InventoryItem 
        //            key={order.id}
        //            orderId={order.orderId}
        //            orderItems={order.orderItems}
        //            price={order.totalPrice}
        //        /></li>
        //     ))
        // }
        // console.log(inventory);


        return (
            <div>
                <Modal show={this.state.importing} closed={this.importCompleteHandler} >
                    <ImportInventoryForm />
                </Modal>
                <Button >Import Inventory</Button>
                <p>Inventory List:</p>
                <ul>{inventory}</ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //inventory: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         //onFetchInventory: (token, userId) => dispatch(actions.fetchInventory(token, userId)),
//         //onImportInventory: (importData, token) => dispatch(actions.importInventory(importData, token))
//     };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(Inventory, axios);
export default connect(mapStateToProps)(Inventory, axios);