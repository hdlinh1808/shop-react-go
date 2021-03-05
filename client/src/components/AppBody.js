import React, { Component } from 'react'
import ProductPage from './product/ProductPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './About';
import Login from './Login'



class AppBody extends Component {
    render() {
        return (
            <div className="app-body">
                <Switch>
                    <Route path="/" exact component={ProductPage}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/login" component={Login}></Route>
                </Switch>
            </div>
        )
    }
}

export default AppBody
