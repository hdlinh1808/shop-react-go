import React, { Component } from 'react'
import { Grid, Sidebar, Segment } from 'semantic-ui-react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import ProductList from './product/ProductList'
import { matchPath } from 'react-router-dom';

export class AdminBody extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }

    }
    

    render() {
        return (
            <Segment className="content">
                <Switch>
                    <Route path={`${this.props.match.path}`} exact component={Dashboard}></Route>
                    <Route path={`${this.props.match.path}/product/list`} component={ProductList}></Route>
                </Switch>
            </Segment>
        )
    }
}

export default withRouter(AdminBody)
