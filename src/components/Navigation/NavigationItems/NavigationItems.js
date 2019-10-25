import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        {props.isAuthenticated ?
        <NavigationItem link="/cashier">New Order</NavigationItem> 
        : null}
        {props.isAuthenticated ?
        <NavigationItem link="/orders">Past Orders</NavigationItem>
        : null}
        {props.isAuthenticated ?
        <NavigationItem link="/logout">Log Out</NavigationItem>
        : <NavigationItem link="/auth">User Log-In</NavigationItem>}
    </ul>
);

export default navigationItems;