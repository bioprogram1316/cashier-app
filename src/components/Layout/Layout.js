import React, {Component} from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

class Layout extends Component {
    render () {
        return (
            <div>
                <Toolbar isAuth={this.props.isAuthenticated} />
                <main className={classes.Content}>{this.props.children}</main>
            </div>
        );
    }
}

export default Layout;