import React, { Component } from 'react'
import { Grid, Sidebar, GridRow, Checkbox } from "semantic-ui-react";
import ProductListView from './ProductListView';
import ProductSidebar from './ProductSidebar';
import { withRouter } from 'react-router-dom'
// import "../../styles/sidebar.css"
export class ProductPage extends Component {

    constructor(props) {
        super(props)
        let visible = false;
        if (window.innerWidth >= 991) {
            visible = true;
        }
        this.state = {
            visibleSidebar: visible,
        }

        console.log("init---------------")
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    setVisibleSidebar(visible) {

        if (window.innerWidth >= 991) {
            visible = true;
        }
        this.setState({
            visibleSidebar: visible
        })
    }

    render() {
        return (
            <Grid>
                <GridRow only='mobile tablet'>
                    <Grid.Column>
                        <Checkbox
                            checked={this.state.visibleSidebar}
                            label={{ children: <code>visible</code> }}
                            onChange={(e, data) => this.setVisibleSidebar(data.checked)}
                        />
                    </Grid.Column>
                </GridRow>
                <GridRow>
                    <Sidebar.Pushable className='custom'>
                        <ProductSidebar visible={this.state.visibleSidebar} setVisibleSidebar={(visible) => this.setVisibleSidebar(visible)} />
                        <div className="pusher-computer">
                            <ProductListView></ProductListView>
                        </div>
                    </Sidebar.Pushable>
                </GridRow>
            </Grid>
        )
    }
}

export default ProductPage
