import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {

    componentDidMount () {
        this.props.onLogout();
    }

    render () {
        return (
            <div>You are now logged out!!</div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);