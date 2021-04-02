import React, { Component } from 'react'
import { Header, Icon, Segment, Message, Breadcrumb } from 'semantic-ui-react'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import ProductList from './product/ProductList'
import { matchPath } from 'react-router-dom';
import Category from './category/Category'

export class AdminBody extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            breadCrumbs: [],
        }
    }

    setTitle(title) {
        this.setState({
            title: title,
        })
    }

    setBreadCrumbs(breadCrumbs) {
        if (breadCrumbs != null) {
            this.setState({
                breadCrumbs: breadCrumbs,
            })
        }
    }

    renderComponent(Component) {
        return <Component setTitle={(title) => this.setTitle(title)} setBreadCrumbs={(breadCrumbs) => this.setBreadCrumbs(breadCrumbs)} />
    }

    render() {
        let relative = this.props.match.path
        let breadCrumbs = null;

        breadCrumbs = this.state.breadCrumbs.map(b => {
            if (b.link)
                return <Breadcrumb.Section as={Link} to={b.to} link={b.link}>{b.content}</Breadcrumb.Section>
            return <Breadcrumb.Section active>{b.content}</Breadcrumb.Section>
        })

        if (this.state.breadCrumbs?.length >= 1) {
            breadCrumbs = breadCrumbs.reduce((prev, cur) => <>{prev}{<Breadcrumb.Divider />}{cur}</>)
            breadCrumbs = <Breadcrumb>{breadCrumbs}</Breadcrumb>
        }
        return (   
            <Segment className="content">
                <Message>
                    <Header as='h3'>
                        <Header.Content>{this.state.title}</Header.Content>
                    </Header>
                </Message>
                {breadCrumbs}
                <Segment>
                    <Switch>
                        <Route path={`${relative}`} exact render={(props) => this.renderComponent(Dashboard)} />
                        <Route path={`${relative}/product/list`} exact render={(props) => this.renderComponent(ProductList)} />
                        <Route path={`${relative}/category`} exact render={(props) => this.renderComponent(Category)} />
                    </Switch>
                </Segment>
            </Segment>
        )
    }
}

export default withRouter(AdminBody)
