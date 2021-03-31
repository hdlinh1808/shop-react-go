import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'

class AdminSidebar extends Component {

    constructor(props) {
        super(props)

        let activeItem = 'dashboard';
        if (this.props?.location?.state?.active) {
            activeItem = this.props.location.state.active;
        }

        this.state = {
            activeItem: activeItem,
            isAuthenticated: false,
        }
    }

    componentWillReceiveProps(newProps) {
        let newActive = newProps?.location?.state?.active;
        if (newActive != this.state.activeItem) {
            this.setState({ activeItem: newActive })
        }
    }

    render() {
        const { activeItem } = this.state
        return (
            <Menu fluid vertical inverted className="admin-sidebar">
                <Menu.Item as={Link}
                    name='dashboard'
                    to={{ pathname: "/admin", state: { active: "dashboard" } }}
                    active={activeItem === 'dashboard'}
                />
                <Menu.Item>
                    <Menu.Header>Products</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={Link}
                            name='list'
                            to={{ pathname: "/admin/product/list", state: { active: "product-list" } }}
                            active={activeItem === 'product-list'}
                        />
                        <Menu.Item as={Link}
                            name='add new'
                            to={{ pathname: "/admin/product/new", state: { active: "product-new" } }}
                            active={activeItem === 'product-new'}
                        />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item
                    name='category'
                />
                <Menu.Item
                    name='about'
                />
            </Menu>
        )
    }
}

export default withRouter(AdminSidebar)
