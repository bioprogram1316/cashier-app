import React from 'react';

import classes from './Home.module.css';
import Button from '../../components/UI/Button/Button';
import OrderHistoryPic from '../../assets/images/cashier-app-past-orders.png';
import AddItemPic from '../../assets/images/cashier-app-add-items.png';
import CurrentOrderPic from '../../assets/images/cashier-app-new-order.png';
import CurrentOrderBottomPic from '../../assets/images/cashier-app-new-order-bottom.png';
import OrderSummaryPic from '../../assets/images/cashier-app-order-summary.png';
import ManualAddPic from '../../assets/images/cashier-app-manual-add.png';

const home = (props) => {

const loginRegisterHandler = () => {
    props.history.push('/auth');
};

return (
    <div>
        <h1>Premier Cashier Application</h1>
        <Button btnType="Success" clicked={loginRegisterHandler}>Log In / Register New User</Button>
        <h2 style={{textDecoration: "underline"}}>Cashier App Features:</h2>
        <ul className={classes.FeaturesList}>
            <li>Easily import your own inventory list</li>
            <li>Process in-person and online orders</li>
            <div className={classes.Row}>
                <div className={classes.TwoColumn}>
                    <img className={classes.Image} src={CurrentOrderPic} alt="Current Order" />
                </div>
                <div className={classes.TwoColumn}>
                    <img className={classes.Image} src={CurrentOrderBottomPic} alt="Current Order Bottom" />
                </div>
            </div>
            <li>Add items to an order using various methods including scanning</li>
            <div className={classes.Row}>
                <div className={classes.OneColumn}>
                    <img className={classes.Image} src={AddItemPic} alt="Add Item" />
                </div>
            </div>
            <li>User Authentication: Users only access their own orders</li>
            <div className={classes.Row}>
                <div className={classes.OneColumn}>
                    <img className={classes.Image} src={OrderHistoryPic} alt="Order History" />
                </div>
            </div>
            <li>Simple, Easy to Use Design</li>
            <div className={classes.Row}>
                <div className={classes.TwoColumn}>
                    <img className={classes.Image} src={ManualAddPic} alt="Manual Add" />
                </div>
                <div className={classes.TwoColumn}>
                    <img className={classes.Image} src={OrderSummaryPic} alt="Order Summary" />
                </div>
            </div>
        </ul>
        <Button btnType="Success" clicked={loginRegisterHandler}>Log In / Register New User</Button>
    </div>
)};

export default home;