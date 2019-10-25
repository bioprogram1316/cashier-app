import React from 'react';

import cashierLogo from '../../assets/images/cashier-app-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={cashierLogo} alt="Cashier App" />
    </div>
);

export default logo;