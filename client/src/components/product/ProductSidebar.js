import React, { Component } from 'react'
import { Grid, Menu, Icon, Button, Sidebar } from 'semantic-ui-react'

class ProductSidebar extends Component {

    constructor(props) {
        super(props)
    }


    setVisible(visible) {
        this.props.setVisibleSidebar(visible)
    }


    render() {
        return (
            // <Sidebar></Sidebar>
            <Sidebar
                as={Menu}
                animation='push'
                icon='labeled'
                inverted
                vertical
                visible={this.props.visible}
                className="product-sidebar"
                >
                <Menu.Item as='a'><Icon name='home' />Home</Menu.Item>
                <Menu.Item as='a'><Icon name='gamepad' />Games</Menu.Item>
                <Menu.Item as='a'><Icon name='camera' />Channels</Menu.Item>
            </Sidebar>
        )
    }
}

export default ProductSidebar
