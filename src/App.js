import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

// lazy loaded components
const asyncCashier = asyncComponent(() => {
  return import('./containers/Cashier/Cashier');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/AllOrders/AllOrders');
});

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncAddItems = asyncComponent(() => {
  return import('./containers/Cashier/AddItems/AddItems');
});

const asyncInventory = asyncComponent(() => {
  return import('./containers/Inventory/Inventory');
});

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} /> 
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/inventory" component={asyncInventory} />
          <Route path="/cashier" component={asyncCashier} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/addItems" component={asyncAddItems} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout isAuthenticated={this.props.isAuthenticated}>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
