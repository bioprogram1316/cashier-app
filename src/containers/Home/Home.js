import React from 'react';

import Button from '../../components/UI/Button/Button';

const home = (props) => {

const loginRegisterHandler = () => {
    props.history.push('/auth');
};

return (
    <div>
        <h1>Premier Cashier Application</h1>
        <Button btnType="Success" clicked={loginRegisterHandler}>Log In / Register New User</Button>
        <h3>Features of the App</h3>
        <ul>
            <li>Easily import your own inventory list</li>
            <li>Process in-person and online orders</li>
            <li>User Authentication: Users only access their own orders</li>
            <li>Simple, Easy to Use Design</li>
            <p>Pics and Stuff</p>
        </ul>
        <Button btnType="Success" clicked={loginRegisterHandler}>Log In / Register New User</Button>
    </div>
)};

export default home;