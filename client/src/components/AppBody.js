import React, { Component } from 'react'
import ProductPage from './product/ProductPage';
import ProductDetail from './product/ProductDetail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './About';
import Login from './Login'
import Register from './Register';
import Account from './account/Account';
import AccountAddress from './account/AccountListAddress';




class AppBody extends Component {
    render() {
        return (
            <div className="app-body">
                <Switch>
                    <Route path="/" exact component={ProductPage}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/product/:id" component={ProductDetail}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/account" exact component={Account}></Route>
                    <Route path="/account/address" component={AccountAddress}></Route>
                </Switch>
            </div>
        )
    }
}

export default AppBody
